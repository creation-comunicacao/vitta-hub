# Imagens de produtos — Devolutiva 07

Fonte consultada: https://www.probiotica.com.br/produtos (catálogo público oficial da fabricante). Conversão JPEG → WebP, 600×600, qualidade 90; sem geração ou modificação de embalagens.

Uso na composição local para revisão. O usuário indicou a loja atual https://www.fitnesspersonal.com.br como fonte autorizada, mas seu acesso foi bloqueado nesta rede. Confirmar correspondência dos SKUs/embalagens e autorização comercial de uso destas imagens da fabricante antes da publicação. Não representam comprovação de estoque WBuy, parceria ou condição de loja oficial.

- `probiotica-whey.webp`: https://supleylab.vtexassets.com/arquivos/ids/158938-600-0/PROB---Atualizacao_Novas-Embalagens_Site---Hiper-Whey-Baunilha---1.jpg?v=638880335948300000
- `probiotica-creatina.webp`: https://supleylab.vtexassets.com/arquivos/ids/160144-600-0/PROB-CREATINA-300g.jpg.jpg?v=639083337860130000
- `probiotica-epic.webp`: https://supleylab.vtexassets.com/arquivos/ids/160992-600-0/PROB---Atualizacao_Novas-Embalagens_Site---Epic---LIMAO---1.jpg?v=639173250714500000

## Recortes transparentes — 20/11/2026

O usuário autorizou explicitamente a remoção técnica do fundo sem IA generativa para preservar as embalagens. `scripts/cutout-products.mjs` lê os três WebP originais, constrói somente o canal alfa e grava `probiotica-{whey,creatina,epic}-transparent.webp` em WebP lossless, 600×600. Nenhum texto, cor ou pixel RGB opaco é redesenhado; o script compara o RGB antes/depois e falha se houver alteração. Revisão visual sobre fundo azul concluída. Originais preservados para Home e rollback.

Uma tentativa de extração com a ferramenta imagegen foi descartada por modificar detalhes finos. Nenhum desses resultados generativos é usado na aplicação. Prompt da tentativa: remover somente o fundo branco e a sombra, com transparência real, preservando a fotografia, rótulos, proporções, cores, logos e textos integralmente. A implementação final usa exclusivamente o recorte técnico autorizado.
