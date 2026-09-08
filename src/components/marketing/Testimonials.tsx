import { testimonials } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { Marquee } from '@/components/ui/Marquee'
import type { Testimonial } from '@/types/marketing'

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[20rem] flex-col rounded-2xl border border-white/8 bg-surface p-7 sm:w-[24rem]">
      <div className="flex gap-1 text-accent" aria-hidden="true">
        {Array.from({ length: 5 }, (_, s) => (
          <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M10 1l2.6 5.6 6 .7-4.5 4.1 1.2 6L10 14.5l-5.3 2.9 1.2-6L1.4 7.3l6-.7z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <img
          src={t.photo}
          alt={t.name}
          loading="lazy"
          className="h-11 w-11 rounded-full border border-white/10 object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-text">{t.name}</p>
          <p className="text-xs text-muted">
            {t.role}, {t.company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

/** Customer quotes, drifting in an endless right-to-left marquee. */
export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by teams"
          title="Support leaders who stopped worrying."
        />
      </div>

      <Reveal className="mt-14">
        <Marquee duration={40} className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}