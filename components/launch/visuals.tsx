import {siteConfig} from '@/config/site';

export function MovementImage({src='/hero-1200.webp',alt='Imagem ilustrativa gerada por IA: atividade física orientada em grupo.',priority=false}:{src?:string;alt?:string;priority?:boolean}){
 return <figure className="launch-movement"><img src={src} alt={alt} width="1200" height="800" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined}/><figcaption>Imagem ilustrativa gerada por IA.</figcaption></figure>;
}
export function ProductVisual(){return <div className="launch-products" role="group" aria-label="Produtos Probiótica"><div className="launch-products-halo" aria-hidden="true"/>{[
 ['whey','Whey Protein Probiótica'],['creatina','Creatina Probiótica'],['epic','Pré-treino Epic Probiótica'],
].map(([file,alt])=><img key={file} className={`product-${file}`} src={`/products/probiotica-${file}.webp`} alt={alt} width="600" height="600" loading="lazy"/>)}</div>}
export function StoreCTA(){return siteConfig.storeUrl?<a className="button" href={siteConfig.storeUrl} data-channel="store">Acessar loja de suplementos</a>:<div className="store-launch-pending"><button className="button" disabled aria-describedby="store-launch-status">Acessar loja de suplementos</button><p id="store-launch-status">O acesso à loja será disponibilizado em breve. Entre em contato para mais informações.</p></div>}
