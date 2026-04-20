import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const MotionAside = motion.aside
const MotionButton = motion.button
const MotionSpan = motion.span

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.2 12 5l7.5 6.2v7.3a.9.9 0 0 1-.9.9h-3.9v-5.2H9.3v5.2H5.4a.9.9 0 0 1-.9-.9v-7.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.2 18.4c1.6-2.6 3.5-3.9 5.8-3.9s4.2 1.3 5.8 3.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect
        x="4.5"
        y="5.5"
        width="15"
        height="4.4"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="4.5"
        y="14.1"
        width="15"
        height="4.4"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5.2 7.2h13.6c.7 0 1.2.5 1.2 1.2v7.2c0 .7-.5 1.2-1.2 1.2H5.2c-.7 0-1.2-.5-1.2-1.2V8.4c0-.7.5-1.2 1.2-1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m5 8 7 5.5L19 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const sectionItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: AboutIcon },
  { id: 'projects', label: 'Projects', Icon: ProjectsIcon },
  { id: 'contact', label: 'Contact', Icon: ContactIcon },
]

function getItemScale(index, hoveredIndex, activeId, itemId) {
  if (hoveredIndex === null) {
    return activeId === itemId ? 1.04 : 1
  }

  const distance = Math.abs(index - hoveredIndex)

  if (distance === 0) {
    return 1.25
  }

  if (distance === 1) {
    return 1.12
  }

  if (distance === 2) {
    return 1.04
  }

  return activeId === itemId ? 1.04 : 1
}

export function Navbar() {
  const [activeId, setActiveId] = useState('home')
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const sections = sectionItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

        if (visibleEntries[0]?.target?.id) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-35% 0px -35% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const itemScales = useMemo(
    () =>
      sectionItems.map((item, index) =>
        getItemScale(index, hoveredIndex, activeId, item.id),
      ),
    [activeId, hoveredIndex],
  )

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(sectionId)
  }

  return (
    <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 md:flex">
      <nav
        className="flex items-end gap-3 rounded-full border border-white/10 bg-[rgba(16,16,16,0.68)] px-4 py-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        aria-label="Section navigation"
      >
        {sectionItems.map((item, index) => {
          const { Icon } = item
          const isActive = activeId === item.id

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <AnimatePresence>
                {hoveredIndex === index && (
                  <MotionSpan
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 whitespace-nowrap rounded-[0.5rem] border border-white/10 bg-black/80 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-md"
                  >
                    {item.label}
                  </MotionSpan>
                )}
              </AnimatePresence>

              <MotionButton
                type="button"
                data-cursor="interactive"
                onClick={() => scrollToSection(item.id)}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{ 
                  scale: itemScales[index],
                  y: hoveredIndex === index ? -8 : 0
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 24, mass: 0.8 }}
                className="relative flex transform-gpu items-center justify-center p-0 outline-none"
              >
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isActive
                      ? 'border-[#00ff88]/30 bg-[#00ff88]/10 text-[#d6ffe9]'
                      : 'border-transparent bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <Icon />
                </div>
                {isActive && (
                  <MotionSpan
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.9)]"
                  />
                )}
              </MotionButton>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
