import {notFound} from 'next/navigation';
export const metadata={title:'Página não encontrada',robots:{index:false,follow:false},alternates:{canonical:null}};
export default function HiddenPage(){notFound();}
