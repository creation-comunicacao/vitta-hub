import {LegalPage} from '@/components/pages/legal';
import {metadataFor} from '@/lib/seo';
import {legalDocuments,isLegalPublished} from '@/content/legal';
export const metadata=metadataFor('Termos de uso | VITTA HUB','Termos de uso do site FITNESS PERSONAL • VITTA HUB.','/termos/',isLegalPublished(legalDocuments.termos));
export default function Page(){return <LegalPage kind="termos"/>}
