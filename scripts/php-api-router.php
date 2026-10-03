<?php
// API local: não renderiza páginas nem serve os arquivos do frontend.
declare(strict_types=1);
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$endpoints = ['/api/contact.php', '/api/contact-token.php'];
if (in_array($path, $endpoints, true)) {
    require __DIR__ . '/../php/public' . $path;
    return true;
}
http_response_code(404);
header('Content-Type: application/json; charset=UTF-8');
echo json_encode(['error' => 'Endpoint não encontrado.']);
