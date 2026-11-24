import sharp from 'sharp';
import {mkdir,stat} from 'node:fs/promises';
import path from 'node:path';

// Deterministic extraction authorized by the client; no generated or redrawn pixels.
const sourceDirectory=process.argv[2];
if(!sourceDirectory)throw new Error('Informe a pasta dos seis PNGs do cliente.');
const files=[
 ['whey','Pote Azul de Whey Protein Probiótica.png'],
 ['epic','Pote Azul EPIC Pré-Treino de Limão.png'],
 ['creatina','Pote azul de creatina Probiótica.png'],
 ['creapure','Pote de Creatina Probiótica Creapure.png'],
 ['creatina-caps','Frasco Azul de Creatina Probiótica.png'],
 ['whey-chocolate','Embalagem de Whey Chocolate Probiótica.png'],
];
await mkdir('public/products/client',{recursive:true});
for(const [id,name] of files){
 const input=path.join(sourceDirectory,name);
 const {data,info}=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const {width:w,height:h}=info;
 const hasTransparency=data.some((value,index)=>index%4===3&&value<255);
 let removed=0;
 if(!hasTransparency){
  const background=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
  const visit=i=>{if(background[i])return;const offset=i*4;const r=data[offset],g=data[offset+1],b=data[offset+2];if(Math.min(r,g,b)>=150&&Math.max(r,g,b)-Math.min(r,g,b)<28){background[i]=1;queue[tail++]=i;}};
  for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x);}
  for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1);}
  while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)visit(i-1);if(x<w-1)visit(i+1);if(y)visit(i-w);if(y<h-1)visit(i+w);}
  for(let i=0;i<w*h;i++)if(background[i]){data[i*4+3]=0;removed++;}
  // Discard isolated checkerboard/compression specks outside the single package.
  const labels=new Int32Array(w*h);let label=0,largest=0,largestSize=0;
  for(let start=0;start<w*h;start++){
   if(labels[start]||data[start*4+3]===0)continue;
   label++;head=0;tail=1;queue[0]=start;labels[start]=label;
   const add=i=>{if(!labels[i]&&data[i*4+3]>0){labels[i]=label;queue[tail++]=i;}};
   while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)add(i-1);if(x<w-1)add(i+1);if(y)add(i-w);if(y<h-1)add(i+w);}
   if(tail>largestSize){largestSize=tail;largest=label;}
  }
  for(let i=0;i<w*h;i++)if(labels[i]!==largest)data[i*4+3]=0;
 }
 // Reframe with transparent padding, never crop the label or invent package details.
 let left=w,top=h,right=0,bottom=0;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(data[(y*w+x)*4+3]>20){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 const target=`public/products/client/${id}.webp`;
 await sharp(data,{raw:{width:w,height:h,channels:4}}).extract({left,top,width:right-left+1,height:bottom-top+1}).resize(700,700,{fit:'contain',background:'#00000000'}).extend({top:50,bottom:50,left:50,right:50,background:'#00000000'}).webp({lossless:true,effort:6}).toFile(target);
 console.log({id,providedAlpha:hasTransparency,removedBackgroundPixels:removed,bytes:(await stat(target)).size});
 await sharp(target).resize(360,360).flatten({background:'#171a1c'}).png().toFile(`/tmp/vitta08-final-${id}-dark.png`);
 await sharp(target).resize(360,360).flatten({background:'#f7f7f7'}).png().toFile(`/tmp/vitta08-final-${id}-light.png`);
}
