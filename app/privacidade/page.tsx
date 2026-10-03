import {LegalPage} from '@/components/pages/legal';
import {metadataFor} from '@/lib/seo';
import {legalDocuments,isLegalPublished} from '@/content/legal';
export const metadata=metadataFor('Política de privacidade | VITTA HUB','Informações sobre privacidade e tratamento de dados na VITTA HUB.','/privacidade/',isLegalPublished(legalDocuments.privacidade));
export default function Page(){return <LegalPage kind="privacidade"/>}
