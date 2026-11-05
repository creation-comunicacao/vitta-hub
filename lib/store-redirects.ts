/** Exact legacy URLs only: never redirect all unknown routes to the store. */
export function validateStoreRedirects(rows: {source:string;destination:string}[], storeOrigin: string, reserved: string[]) {
 const seen=new Set<string>();
 if(rows.length && !/^https:\/\/[^/]+$/.test(storeOrigin))throw new Error('Confirme STORE_REDIRECT_ORIGIN antes de cadastrar redirects.');
 return rows.map(row=>{
  if(!/^\/[a-zA-Z0-9/_\-.]+$/.test(row.source)||row.source.includes('..'))throw new Error('Origem de redirect deve ser um caminho literal.');
  const normalized=row.source.replace(/\/$/,'');
  if(seen.has(normalized)||reserved.some(path=>path.replace(/\/$/,'')===normalized)||/^\/(?:api|_next|conteudos)(?:\/|$)/.test(row.source))throw new Error(`Redirect duplicado ou conflitante: ${row.source}`);
  seen.add(normalized);
  const destination=new URL(row.destination);
  if(destination.origin!==storeOrigin||destination.username||destination.password||destination.hash||destination.search)throw new Error('Destino deve pertencer à loja aprovada, sem credenciais ou parâmetros.');
  return {source:row.source,destination:destination.href,statusCode:301 as const};
 });
}
