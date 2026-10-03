<?php
declare(strict_types=1);
require __DIR__.'/../php/private/contact.php';
function check($condition,string $label):void{if(!$condition)throw new RuntimeException($label);echo "OK: $label\n";}
$config=['enabled'=>true,'privacy_approved'=>true,'origin'=>'https://example.test','sender'=>'site@example.test','recipient'=>'leads@example.test','rate_secret'=>str_repeat('s',32),'platform'=>'linux','state_dir'=>sys_get_temp_dir().'/vitta-rate-'.bin2hex(random_bytes(4))];
$input=['name'=>'Pessoa Teste','city'=>'Cidade Teste','company'=>'Condomínio Teste','role'=>'Síndico','phone'=>'11999999999','email'=>'test@example.test','interest'=>'gestao-esportiva','plan'=>'','message'=>'Mensagem sintética para teste local.','consent'=>true,'website'=>'','token'=>str_repeat('a',64),'source'=>'/gestao-esportiva-condominios/'];
$session=['token'=>$input['token'],'issued_at'=>microtime(true)-3];$sent=0;
$send=static function($data,$config)use(&$sent){$sent++;return true;};$rate=static function(){return true;};
check(vitta_ready($config),'Configuração válida');
[$status]=vitta_process(array_replace($input,['email'=>"test@example.test\r\nBcc: attacker@example.test"]),$config,$session,$send,$rate);check($status===422&&$sent===0,'Bloqueia injeção de cabeçalhos');
[$status]=vitta_process(array_replace($input,['company'=>'']),$config,$session,$send,$rate);check($status===422,'Exige condomínio no B2B');
[$status]=vitta_process(array_replace($input,['consent'=>false]),$config,$session,$send,$rate);check($status===422,'Exige autorização de contato');
[$status]=vitta_process(array_replace($input,['website'=>'spam']),$config,$session,$send,$rate);check($status===400,'Bloqueia honeypot');
[$status]=vitta_process($input,array_replace($config,['enabled'=>false]),$session,$send,$rate);check($status===503&&$sent===0,'Não simula envio sem configuração');
[$status]=vitta_process($input,array_replace($config,['privacy_approved'=>false]),$session,$send,$rate);check($status===503,'Bloqueia política não aprovada');
[$status]=vitta_process(array_replace($input,['token'=>'errado']),$config,$session,$send,$rate);check($status===403,'Bloqueia token inválido');
$fast=['token'=>$input['token'],'issued_at'=>microtime(true)];[$status]=vitta_process($input,$config,$fast,$send,$rate);check($status===400,'Bloqueia preenchimento instantâneo');
[$status]=vitta_process($input,$config,$session,$send,static function(){return false;});check($status===429,'Aplica limite de tentativas');
[$status,$body]=vitta_process($input,$config,$session,static function(){return false;},$rate);check($status===502&&empty($body['ok']),'Falha de transporte não vira sucesso');
[$status,$body]=vitta_process($input,$config,$session,$send,$rate);check($status===200&&$body['ok']&&$sent===1,'Sucesso somente após aceite do transporte simulado');
[$status]=vitta_process($input,$config,$session,$send,$rate);check($status===200&&$sent===1,'Repetição não duplica o envio');
[$status]=vitta_process(array_replace($input,['message'=>'Uma nova mensagem diferente.']),$config,$session,$send,$rate);check($status===409&&$sent===1,'Conteúdo alterado não recebe sucesso de um envio anterior');
[$data,$errors]=vitta_validate(array_replace($input,['interest'=>'nutricao','company'=>'','role'=>'','source'=>'/contato/?email=private@example.test']));check(!$errors&&$data['source']==='/contato/'&&$data['company']==='','Roteamento B2C e origem sem dados pessoais');
check(vitta_rate($config,'192.0.2.1')&&!vitta_rate($config,'192.0.2.1'),'Limite por IP com lock de arquivo');
foreach(glob($config['state_dir'].'/*')?:[]as$file)unlink($file);rmdir($config['state_dir']);
echo "Nenhum e-mail real foi enviado.\n";
