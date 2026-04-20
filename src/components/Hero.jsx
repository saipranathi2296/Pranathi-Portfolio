import { motion } from 'framer-motion'
import { profileData } from '../data/profileData'
import { TraceButton } from './TraceButton'

const MotionDiv = motion.div
const MotionP = motion.p
const MotionRect = motion.rect

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell relative flex min-h-screen items-center justify-center overflow-hidden py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="hero-vignette absolute inset-0" />

        <MotionDiv
          animate={{
            x: ['-6%', '8%', '-4%'],
            y: ['-4%', '10%', '-8%'],
            scale: [1, 1.08, 0.98, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="hero-blob hero-blob--primary"
        />
        <MotionDiv
          animate={{
            x: ['8%', '-7%', '10%'],
            y: ['4%', '-6%', '5%'],
            scale: [0.96, 1.04, 1, 0.96],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="hero-blob hero-blob--secondary"
        />
        <MotionDiv
          animate={{
            x: ['0%', '6%', '-4%'],
            y: ['10%', '0%', '8%'],
            scale: [1, 0.94, 1.02, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="hero-blob hero-blob--tertiary"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-name-shell"
        >
          <div className="hero-trace-frame">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <rect
                x="1.4"
                y="1.4"
                width="97.2"
                height="97.2"
                rx="17"
                ry="17"
                pathLength="100"
                className="fill-none stroke-white/10"
                strokeWidth="1"
              />
              <MotionRect
                x="1.4"
                y="1.4"
                width="97.2"
                height="97.2"
                rx="17"
                ry="17"
                pathLength="100"
                className="fill-none stroke-[#00ff88]"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeDasharray="22 78"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{
                  duration: 7.8,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              />
            </svg>

            <h1
              data-cursor="text"
              className="display-font hero-name text-6xl font-semibold uppercase leading-none tracking-[-0.08em] text-white md:text-8xl lg:text-[9rem]"
            >
              {profileData.name}
            </h1>
          </div>
        </MotionDiv>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-sm uppercase tracking-[0.38em] text-[#7bffbd] md:text-base"
        >
          {profileData.subtitle}
        </MotionP>

        <MotionP
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg"
        >
          {profileData.heroDescription}
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <TraceButton href="#projects" tone="filled">
            View Projects
          </TraceButton>
          <TraceButton href="#contact">Contact Me</TraceButton>
        </MotionDiv>
      </div>
    </section>
  )
}
