'use client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
export function FAQAccordion({items}:{items:readonly {question:string;answer:string}[]}) {
  return <Accordion type="single" collapsible className="faq-list">{items.map((item,index)=><AccordionItem key={item.question} value={`question-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent><p>{item.answer}</p></AccordionContent></AccordionItem>)}</Accordion>;
}
