<?php
declare(strict_types=1);
require dirname(__DIR__,2).'/private/contact.php';
if(($_SERVER['REQUEST_METHOD']??'')!=='POST'){vitta_json(['error'=>'Método não permitido.'],405);exit;}
$c=vitta_config();
if(!vitta_ready($c)){vitta_json(['error'=>'O envio ainda não está disponível. Nenhuma solicitação foi enviada.'],503);exit;}
if(empty($_SERVER['HTTP_ORIGIN']) || $_SERVER['HTTP_ORIGIN']!==$c['origin']){vitta_json(['error'=>'Origem da solicitação inválida.'],403);exit;}
if(strpos($_SERVER['CONTENT_TYPE']??'','application/json')!==0){vitta_json(['error'=>'Formato inválido.'],415);exit;}
$raw=file_get_contents('php://input',false,null,0,16385);
if($raw===false || strlen($raw)>16384){vitta_json(['error'=>'Solicitação muito grande.'],413);exit;}
$input=json_decode($raw,true);
if(!is_array($input)){vitta_json(['error'=>'Solicitação inválida.'],400);exit;}
vitta_session();
[$status,$result]=vitta_process($input,$c,$_SESSION,'vitta_mail',static function()use($c){return vitta_rate($c,$_SERVER['REMOTE_ADDR']??'unknown');});
vitta_json($result,$status);
