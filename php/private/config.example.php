<?php
// Copie para config.php FORA da pasta pública. Preencha apenas dados oficiais.
return [
    'enabled' => false,
    'privacy_approved' => false,
    'origin' => '', // https://dominio-oficial sem barra final
    'recipient' => '', // Caixa que receberá as solicitações
    'sender' => '', // E-mail válido do domínio hospedado (nunca o visitante)
    'platform' => 'linux', // linux ou windows
    'rate_secret' => '', // Segredo aleatório de pelo menos 32 caracteres
    'state_dir' => __DIR__ . '/state', // Gravável pelo PHP; fora da pasta pública
];
