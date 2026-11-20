/* Original RGB is never changed. Alpha comes only from the blue package silhouette.
   User authorized deterministic background extraction on 2026-11-20. */
import sharp from 'sharp';
import path from 'node:path';
(async()=>{
 for(const name of ['whey','creatina','epic']){
  const source=path.join('public/products',`probiotica-${name}.webp`);
  const {data,info}=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {width:w,height:h}=info;
  const rows=[];
  for(let y=0;y<h;y++){
   let left=w,right=-1;
   for(let x=0;x<w;x++){
    const i=(y*w+x)*3,[r,g,b]=data.subarray(i,i+3);
    if(b>100&&b-r>35&&(b-g>10||g-r>25)){left=Math.min(left,x);right=x;}
   }
   rows.push(right-left>20?{left,right}:null);
  }
  // The whey artwork reaches the right edge of the cylindrical body.
  // Protect that cream-colored illustration using the actual straight body contour.
  if(name==='whey'){
   const bodyRight=Math.max(...rows.slice(180,490).filter(Boolean).map(row=>row.right));
   for(let y=180;y<490;y++)if(rows[y])rows[y].right=bodyRight;
  }
  const first=rows.findIndex(Boolean),last=rows.findLastIndex(Boolean);
  // Include the original light-colored bottom rim, inside its package silhouette.
  for(let y=last+1;y<=Math.min(h-1,last+2);y++){
   const rim=rows[last];const inset=(y-last)*3;
   rows[y]={left:rim.left+inset,right:rim.right-inset};
  }
  const rgba=Buffer.alloc(w*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const i=y*w+x;data.copy(rgba,i*4,i*3,i*3+3);
   const row=rows[y];
   if(row&&x>=row.left&&x<=row.right){
    const edge=Math.min(x-row.left,row.right-x,y-first,last+2-y);
    rgba[i*4+3]=edge===0?160:255;
   }
  }
  const target=path.join('public/products',`probiotica-${name}-transparent.webp`);
  await sharp(rgba,{raw:{width:w,height:h,channels:4}}).webp({lossless:true,effort:6}).toFile(target);
  const out=await sharp(target).raw().toBuffer();
  let changed=0,opaque=0;
  for(let i=0;i<w*h;i++)if(out[i*4+3]===255){opaque++;for(let c=0;c<3;c++)if(out[i*4+c]!==data[i*3+c])changed++;}
  if(changed)throw Error(`RGB changed: ${name}`);
  console.log(name,{size:(await sharp(target).metadata()).size,opaquePixels:opaque,changedRGB:changed});
 }
})().catch(e=>{console.error(e);process.exit(1)});
