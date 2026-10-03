<?php
declare(strict_types=1);
require dirname(__DIR__,2).'/private/contact.php';
if(($_SERVER['REQUEST_METHOD']??'')!=='GET'){vitta_json(['error'=>'Método não permitido.'],405);exit;}
$c=vitta_config();
if(!vitta_ready($c)){vitta_json(['available'=>false],503);exit;}
vitta_session();
// A aba reutiliza a sessão; uma solicitação já aceita não é reenviada.
if(!empty($_SESSION['accepted']) || empty($_SESSION['token']) || microtime(true)-($_SESSION['issued_at']??0)>7200){
    $_SESSION['token']=bin2hex(random_bytes(32));$_SESSION['issued_at']=microtime(true);unset($_SESSION['accepted']);
}
vitta_json(['available'=>true,'token'=>$_SESSION['token']]);
