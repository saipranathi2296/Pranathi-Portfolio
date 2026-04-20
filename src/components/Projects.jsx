import { useRef } from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../data/profileData'
import { useStackedCards } from '../hooks/useStackedCards'
import { useTilt } from '../hooks/useTilt'
import { TraceButton } from './TraceButton'

const MotionDiv = motion.div

function TiltedProjectSurface({ children }) {
  const tiltRef = useTilt({ maxTilt: 7, scale: 1.014, easing: 0.12 })

  return (
    <div ref={tiltRef} className="tilt-card h-full rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,136,0.09),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_26%)] p-6 md:p-8">
      {children}
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)

  useStackedCards(sectionRef)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-shell py-24 md:py-32"
    >
      <div className="section-heading">
        <p className="section-kicker">Projects</p>
        <h2
          data-cursor="text"
          className="display-font max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl"
        >
          Scroll through the work as a calm stack of focused project cards.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
          Each card is pinned into place with GSAP-backed scroll timing so the
          transition between projects feels deliberate and easy to read.
        </p>
      </div>

      <div className="mt-14">
        {profileData.projects.map((project, index) => (
          <div
            key={project.title}
            className="project-stack-row min-h-[84vh] md:min-h-[94vh]"
          >
            <article
              data-stack-card
              className="sticky overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(26,26,26,0.92),_rgba(10,10,10,0.96))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
              style={{
                top: `calc(4.5rem + ${index * 1.1}rem)`,
                zIndex: index + 1,
              }}
            >
              <MotionDiv
                data-stack-panel
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full"
              >
                <TiltedProjectSurface>
                  <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-[#00ff88]/20 bg-[#00ff88]/8 px-3 py-1 text-[0.66rem] uppercase tracking-[0.28em] text-[#97ffcb]">
                          {project.label}
                        </span>
                        <span className="h-px w-14 bg-white/10" />
                      </div>

                      <h3
                        data-cursor="text"
                        className="display-font mt-6 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex min-w-[16rem] flex-col gap-3">
                      {project.liveUrl ? (
                        <TraceButton href={project.liveUrl} external compact>
                          Live Link
                        </TraceButton>
                      ) : null}
                      {project.githubUrl ? (
                        <TraceButton href={project.githubUrl} external compact>
                          GitHub Link
                        </TraceButton>
                      ) : null}
                      {!project.liveUrl && !project.githubUrl ? (
                        <div className="rounded-[1.2rem] border border-white/8 bg-black/25 px-4 py-4 text-sm leading-7 text-zinc-400">
                          Description-only project. This concept is intentionally
                          shown without external links.
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[1.4rem] border border-white/8 bg-black/25 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                        Focus
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-white/8 bg-black/25 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                        Outcome
                      </p>
                      <p className="mt-5 text-sm leading-7 text-zinc-300">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </TiltedProjectSurface>
              </MotionDiv>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
