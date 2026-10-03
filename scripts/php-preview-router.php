<?php
// Somente prévia local; não incluir na hospedagem.
$root=realpath(__DIR__.'/../locaweb/public');
$path=rawurldecode(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH)?:'/');
$file=realpath($root.$path);
if($file && strpos($file,$root.DIRECTORY_SEPARATOR)===0 && is_file($file))return false;
if($file && ($file===$root || strpos($file,$root.DIRECTORY_SEPARATOR)===0) && is_dir($file) && is_file($file.'/index.html')){header('Content-Type: text/html; charset=UTF-8');readfile($file.'/index.html');return true;}
http_response_code(404);header('Content-Type: text/html; charset=UTF-8');readfile($root.'/404.html');
