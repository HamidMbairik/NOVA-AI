import { faqs } from '@/data/marketing'
import { AccordionItem } from '@/components/ui/Accordion'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

export function FAQSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <Reveal delay={0.1}>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} question={faq.question} defaultOpen={i === 0}>
                {faq.answer}
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}