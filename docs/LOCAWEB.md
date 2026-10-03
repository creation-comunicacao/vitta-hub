# Entrega para Locaweb — arquivos estáticos + PHP

A interface é desenvolvida em React/TypeScript e entregue em HTML, CSS e JavaScript estáticos. O processamento de formulários é PHP (sintaxe compatível com PHP 7.4+; use uma versão ainda suportada no painel). A hospedagem não precisa de Node.js, Cloudflare Workers, Composer ou banco de dados.

## Gerar o pacote

1. Instalar dependências com `npm run install:ci`.
2. Configurar `.env` usando `.env.example` apenas com os dados públicos oficiais.
3. Executar `npm test` e `npm run build:locaweb`.
4. O resultado fica em `locaweb/public/` e `locaweb/private/`.

O pacote atual é uma prévia: noindex, formulário sem envio real, artigos aguardando revisão e documentos legais pendentes. Não liberar produção antes de cumprir a lista de ativação.

## Hospedagem

- Enviar o conteúdo de `public/` para a pasta pública do domínio, preservando `.htaccess` e subpastas.
- Enviar `private/` para uma pasta irmã da pasta pública, fora da raiz acessível pela web.
- O caminho padrão usado pelos endpoints é `dirname(__DIR__, 2) . '/private/contact.php'`. Se a Locaweb usar outra organização, ajustar esse caminho nos dois arquivos PHP da pasta `api`.
- Não colocar configuração real, fontes do projeto, testes, documentos estratégicos ou `node_modules` na pasta pública.
- O `.htaccess` contém página 404, cabeçalhos e bloqueio de listagem para Apache/Linux. Em hospedagem Windows/IIS, solicitar a configuração equivalente no painel/servidor; não presumir suporte a `.htaccess`.
- O arquivo `config/redirects.json` aceita pares `{ "from": "/url-antiga", "to": "/nova/" }`. Sem mapa real, nenhuma URL antiga foi inventada.

## Ativar o contato

1. Publicar a política aprovada em `content/legal.ts` e gerar novamente o site.
2. Copiar `private/config.example.php` para `private/config.php` no servidor.
3. Preencher `origin` com a origem HTTPS oficial sem barra final, `recipient` com o destinatário e `sender` com um e-mail válido do domínio hospedado.
4. Preencher `rate_secret` com um segredo aleatório de pelo menos 32 caracteres; manter fora do código público.
5. Escolher `platform` Linux ou Windows. Garantir permissão de escrita do PHP em `state_dir`, fora da pasta pública.
6. Após validar domínio, destino e política, definir `privacy_approved` e `enabled` como `true`.
7. Testar uma solicitação real, conferir recebimento na caixa de destino e pasta de spam. Não basta `mail()` aceitar a mensagem; a entrega real precisa ser verificada.

A implementação segue a [orientação da Locaweb para mail()](https://www.locaweb.com.br/ajuda/wiki/como-enviar-e-mails-com-a-funcao-mail-do-php-hospedagem-de-sites/): remetente/Return-Path do domínio, visitante em Reply-To e parâmetro -r no Linux. O modo atual usa mail() da hospedagem. Em Revenda Plesk/cPanel, ou quando o plano exigir SMTP autenticado, adaptar o transporte conforme os dados do serviço; não há credencial SMTP inventada.

## Proteções e limites

- Validação no navegador e em PHP; campos B2B condicionais; tamanho máximo de requisição; whitelist de interesse/plano; prevenção de injeção em cabeçalhos.
- Sessão HttpOnly/SameSite, token CSRF, checagem exata de Origin, honeypot e tempo mínimo de preenchimento.
- Limite com lock de arquivo por IP (5 tentativas/hora e intervalo de 30 segundos), com IP transformado por HMAC. Não salva o conteúdo do lead em arquivos.
- Tentativas aceitas são deduplicadas na sessão. O sucesso representa aceite pelo transporte de e-mail, não comprovação de entrega final.
- Falha de envio preserva os campos; nenhum sucesso é simulado.
- Rodar exclusivamente via HTTPS. Sessão padrão PHP deve estar disponível.

## Conteúdos e analytics

- `content/articles.ts` define o contrato editorial; somente registros aprovados, publicados e datados são expostos. Novos artigos exigem gerar e enviar o site novamente. Não foi instalado um painel CMS.
- `lib/analytics.ts` oferece um adaptador opt-in. Não carrega GA4/GTM nem envia eventos enquanto não houver integração real e autorização de coleta. O adaptador recebe somente nome de evento, caminho sem query/hash, título público, CTA, posição e interesse.
- Eventos preparados: form_submit, whatsapp_click, presentation_request, consultoria_interest, nutrition_contact, store_click e cta_click.
- Domínio oficial habilita canonical, sitemap e URLs em schema; `SITE_INDEXABLE=true` só deve ser usado após o aceite final.

## Prévia local do mesmo pacote

`npm run preview:php` (porta 8788). A prévia principal de desenvolvimento é `npm run dev` (frontend React na porta 5173, API PHP na porta 8789). Reinicie os processos após mover a pasta do projeto.

O roteador serve somente a prévia. O site exportado e os endpoints PHP são os mesmos arquivos do pacote. Os testes usam transportes simulados; não enviam e-mails reais.
