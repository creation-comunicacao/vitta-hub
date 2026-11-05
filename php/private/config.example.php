<?php
// Copie para config.php FORA da pasta pública. Preencha apenas dados oficiais.
return [
    'enabled' => false,
    'privacy_approved' => false,
    'origin' => 'https://fitnesspersonal.com.br', // https://dominio-oficial sem barra final
    'recipient' => 'vittahub@fitnesspersonal.com.br', // Caixa que receberá as solicitações
    'sender' => '', // E-mail válido do domínio hospedado (nunca o visitante)
    'transport' => 'mail', // mail (Locaweb) ou resend (API autenticada)
    'resend_api_key' => getenv('RESEND_API_KEY') ?: '', // Nunca em NEXT_PUBLIC_*
    'platform' => 'linux', // linux ou windows
    'rate_secret' => '', // Segredo aleatório de pelo menos 32 caracteres
    'state_dir' => __DIR__ . '/state', // Gravável pelo PHP; fora da pasta pública
];
