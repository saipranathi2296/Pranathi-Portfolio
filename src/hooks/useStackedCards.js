import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useStackedCards(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-stack-card]')

      cards.forEach((card, index) => {
        const panel = card.querySelector('[data-stack-panel]') ?? card
        const nextCard = cards[index + 1]

        gsap.fromTo(
          panel,
          {
            y: 72,
            scale: 0.965,
            opacity: 0.55,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=5%',
              end: 'top center',
              scrub: true,
            },
          },
        )

        if (nextCard) {
          gsap.to(panel, {
            scale: 0.96,
            y: -10,
            opacity: 0.7,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 82%',
              end: 'top 42%',
              scrub: true,
            },
          })
        }
      })
    }, section)

    return () => context.revert()
  }, [sectionRef])
}
