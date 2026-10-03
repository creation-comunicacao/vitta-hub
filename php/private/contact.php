<?php
// PHP 7.4+; sem Composer, Node ou serviço externo de formulários.
declare(strict_types=1);
function vitta_config(): array {
    $defaults = require __DIR__ . '/config.example.php';
    $path = __DIR__ . '/config.php';
    return is_file($path) ? array_replace($defaults, require $path) : $defaults;
}
function vitta_ready(array $c): bool {
    $origin = parse_url($c['origin']);
    return !empty($c['enabled']) && !empty($c['privacy_approved'])
        && is_array($origin) && ($origin['scheme'] ?? '') === 'https' && !empty($origin['host'])
        && empty($origin['user']) && empty($origin['pass']) && empty($origin['query']) && empty($origin['fragment'])
        && empty($origin['path']) && strlen($c['rate_secret']) >= 32
        && vitta_email($c['sender']) && vitta_email($c['recipient']);
}
function vitta_email($value): bool {
    return is_string($value) && strlen($value) <= 254 && !preg_match('/[\r\n]/', $value)
        && (bool)filter_var($value, FILTER_VALIDATE_EMAIL);
}
function vitta_json(array $body, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
function vitta_session(): void {
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('vitta_contact');
    session_set_cookie_params(['lifetime'=>0, 'path'=>'/api/', 'secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', 'httponly'=>true, 'samesite'=>'Strict']);
    session_start();
}
function vitta_validate(array $input): array {
    $limits=['name'=>120,'city'=>120,'company'=>120,'role'=>120,'phone'=>25,'email'=>254,'message'=>2000,'interest'=>40,'plan'=>60,'website'=>200,'token'=>100,'source'=>180];
    $data=[];$errors=[];
    foreach($limits as $key=>$limit){
        $raw=$input[$key]??'';
        if(!is_string($raw)){$errors[$key]='Confira este campo.';$raw='';}
        $value=trim($raw);$data[$key]=$value;
        if(preg_match_all('/./us',$value)>$limit || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/',$value))$errors[$key]='Confira o tamanho e o conteúdo deste campo.';
    }
    foreach(['name','city'] as $key)if(strlen($data[$key])<2)$errors[$key]='Preencha este campo.';
    $interests=['gestao-esportiva','hub-fitness','hub-aquatico','hub-esportivo','consultoria','nutricao','suplementacao','outro'];
    if(!in_array($data['interest'],$interests,true))$errors['interest']='Selecione um interesse.';
    $b2b=in_array($data['interest'],array_slice($interests,0,4),true);
    foreach(['company','role'] as $key){if($b2b && strlen($data[$key])<2)$errors[$key]='Preencha este campo.';if(!$b2b)$data[$key]='';}
    $digits=preg_replace('/\D/','',$data['phone']);
    if(!preg_match('/^\+?[\d\s().-]+$/',$data['phone'])||strlen($digits)<10||strlen($digits)>15)$errors['phone']='Informe um WhatsApp com DDD.';
    if(!vitta_email($data['email']))$errors['email']='Informe um e-mail válido.';
    if(preg_match_all('/./us',$data['message'])<10)$errors['message']='Escreva pelo menos 10 caracteres.';
    if(($input['consent']??false)!==true)$errors['consent']='Confirme a leitura da política e a finalidade do contato.';
    $data['consent']=($input['consent']??false)===true;
    if($data['interest']!=='consultoria')$data['plan']='';
    if(!in_array($data['plan'],['','Essencial','Performance & Nutri','Híbrido Start','Executive VIP'],true))$errors['plan']='Plano inválido.';
    if(!preg_match('~^/(?:|vitta-hub/?|gestao-esportiva-condominios/?|hub-(?:fitness|aquatico|esportivo)/?|miva/?|consultoria-online/?|e-hub-nutrition/?|equipe/?|conteudos/?|contato/?)$~',$data['source']))$data['source']='/contato/';
    return [$data,$errors];
}
function vitta_mail(array $data,array $c): bool {
    $nl=$c['platform']==='windows'?"\r\n":"\n";
    $headers='MIME-Version: 1.0'.$nl.'Content-Type: text/plain; charset=UTF-8'.$nl
        .'From: '.$c['sender'].$nl.'Return-Path: '.$c['sender'].$nl.'Reply-To: '.$data['email'];
    $subject='=?UTF-8?B?'.base64_encode('VITTA HUB — '.$data['interest']).'?=';
    $labels=['name'=>'Nome','company'=>'Condomínio/Empresa','role'=>'Cargo','city'=>'Cidade','phone'=>'WhatsApp','email'=>'E-mail','interest'=>'Interesse','plan'=>'Plano','message'=>'Mensagem','source'=>'Página de origem'];
    $lines=['Solicitação de contato — VITTA HUB'];foreach($labels as $key=>$label)$lines[]=$label.': '.$data[$key];
    $lines[]='Autorização para responder ao contato: confirmada';
    $message=implode($nl.$nl,$lines);
    // A documentação Locaweb exige remetente do domínio e -r no Linux/Postfix.
    if($c['platform']==='windows')return mail($c['recipient'],$subject,$message,$headers);
    return mail($c['recipient'],$subject,$message,$headers,'-r'.escapeshellarg($c['sender']));
}
function vitta_rate(array $c,string $ip): bool {
    $directory=$c['state_dir'];
    if(!is_dir($directory)&&!mkdir($directory,0700,true))return false;
    $path=$directory.'/'.hash_hmac('sha256',$ip,$c['rate_secret']).'.json';
    $file=fopen($path,'c+');if(!$file)return false;
    if(!flock($file,LOCK_EX)){fclose($file);return false;}
    $saved=json_decode(stream_get_contents($file),true);$now=time();
    $times=is_array($saved)?array_values(array_filter($saved,static function($at)use($now){return is_int($at)&&$now-$at<3600;})):[];
    $allowed=count($times)<5 && (!$times||$now-end($times)>=30);
    if($allowed){$times[]=$now;rewind($file);ftruncate($file,0);fwrite($file,json_encode($times));fflush($file);}
    flock($file,LOCK_UN);fclose($file);
    // Expira registros anônimos antigos. Nunca armazena o conteúdo dos contatos.
    foreach(glob($directory.'/*.json')?:[] as $old)if(filemtime($old)<$now-86400)@unlink($old);
    return $allowed;
}
function vitta_process(array $input,array $c,array &$session,callable $send,callable $rate): array {
    [$data,$errors]=vitta_validate($input);
    if($errors)return [422,['error'=>'Confira os campos indicados.','fields'=>$errors]];
    if($data['website']!=='')return [400,['error'=>'Não foi possível validar a solicitação.']];
    if(!vitta_ready($c))return [503,['error'=>'O envio ainda não está disponível. Nenhuma solicitação foi enviada.']];
    if(empty($session['token'])||!hash_equals($session['token'],$data['token']))return [403,['error'=>'A sessão expirou. Atualize a página e tente novamente.']];
    $age=microtime(true)-($session['issued_at']??0);
    if($age<1.5||$age>7200)return [400,['error'=>'A sessão expirou ou ainda está sendo preparada. Atualize a página e tente novamente.']];
    if(!empty($session['accepted'])){
        $copy=$data;unset($copy['token']);
        if(!hash_equals($session['accepted_hash']??'',hash('sha256',json_encode($copy))))return [409,['error'=>'Esta sessão já encaminhou outra solicitação. Atualize a página para iniciar um novo contato.']];
        return [200,['ok'=>true]];
    }
    if(!$rate())return [429,['error'=>'Aguarde antes de tentar novamente. O limite é de cinco tentativas por hora.']];
    try{$ok=$send($data,$c);}catch(Throwable $e){$ok=false;}
    if(!$ok)return [502,['error'=>'Não foi possível encaminhar a solicitação. Seus campos foram preservados; tente novamente mais tarde.']];
    $session['accepted']=true;$copy=$data;unset($copy['token']);$session['accepted_hash']=hash('sha256',json_encode($copy));
    return [200,['ok'=>true]];
}
