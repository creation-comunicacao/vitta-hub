import assert from 'node:assert/strict';
const origin = new URL(process.argv[2] || 'http://127.0.0.1:5173');
assert(['127.0.0.1', 'localhost'].includes(origin.hostname), 'Use uma prévia local.');
const routes = ['', 'vitta-hub', 'gestao-esportiva-condominios', 'hub-fitness', 'hub-aquatico', 'hub-esportivo', 'miva', 'consultoria-online', 'e-hub-nutrition', 'equipe', 'contato', 'conteudos', 'privacidade', 'termos'];
const assets = new Map();
for (const route of routes) {
  const response = await fetch(new URL('/' + route + (route ? '/' : ''), origin));
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get('content-type') || '', /text\/html/);
  const html = await response.text();
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `H1: ${route}`);
  for (const tag of html.matchAll(/<(?:link|script|img)\b[^>]*>/g)) {
    const url = tag[0].match(/(?:src|href)="([^"#]+)"/)?.[1];
    if (!url?.startsWith('/')) continue;
    const kind = tag[0].startsWith('<script') || tag[0].includes('modulepreload') ? 'script' : tag[0].includes('stylesheet') ? 'style' : tag[0].startsWith('<img') ? 'image' : null;
    if (kind) assets.set(url.replaceAll('&amp;', '&'), kind);
  }
}
for (const [path, kind] of assets) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `Asset: ${path}`);
  const type = response.headers.get('content-type') || '';
  const expected = kind === 'script' ? /(?:javascript|ecmascript)/ : kind === 'style' ? /text\/css/ : /image\//;
  const body = new Uint8Array(await response.arrayBuffer());
  // Em desenvolvimento, Vite transforma imports CSS em módulos de injeção/HMR.
  if (kind === 'style' && /javascript/.test(type)) {
    assert.match(new TextDecoder().decode(body), /__vite__updateStyle/, `CSS Vite: ${path}`);
  } else assert.match(type, expected, `MIME: ${path}`);
  assert(body.byteLength > 0, `Asset vazio: ${path}`);
}
const token = await fetch(new URL('/api/contact-token.php', origin));
assert([200, 503].includes(token.status), 'Endpoint PHP não alcançável');
assert.match(token.headers.get('content-type') || '', /application\/json/);
assert.equal(typeof (await token.json()).available, 'boolean');
console.log(`OK: ${routes.length} páginas, ${assets.size} assets com HTTP/MIME válidos e API PHP em ${origin.origin}. Nenhum envio realizado.`);
