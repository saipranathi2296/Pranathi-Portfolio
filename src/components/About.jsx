import { motion } from 'framer-motion'
import { profileData } from '../data/profileData'
import { useTilt } from '../hooks/useTilt'
import { SocialIcon } from './SocialIcon'

const MotionArticle = motion.article
const MotionA = motion.a
const MotionSpan = motion.span

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
}

function TiltedBentoCard({ children, className, transition }) {
  const tiltRef = useTilt()

  return (
    <MotionArticle
      ref={tiltRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={transition}
      className={`bento-card tilt-card ${className}`}
    >
      {children}
    </MotionArticle>
  )
}

function ProfileCard({ profile, index }) {
  return (
    <MotionA
      href={profile.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="interactive"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...revealTransition, delay: index * 0.06 }}
      className="group/profile rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4 transition duration-300 hover:border-[#00ff88]/30 hover:bg-white/[0.045]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="profile-icon-shell">
            <SocialIcon type={profile.type} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              {profile.label}
            </p>
            <p className="mt-1 text-sm text-white">{profile.username}</p>
          </div>
        </div>
        <span className="text-[#00ff88] transition-transform duration-300 group-hover/profile:-translate-y-1 group-hover/profile:translate-x-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </div>

      {profile.problemCount ? (
        <div className="mt-4 rounded-[1rem] border border-white/8 bg-black/20 px-3 py-2">
          <p className="text-[0.64rem] uppercase tracking-[0.24em] text-zinc-500">
            {profile.countLabel}
          </p>
          <p className="mt-1 display-font text-xl tracking-[-0.05em] text-[#bfffe0]">
            {profile.problemCount}
          </p>
        </div>
      ) : null}
    </MotionA>
  )
}

export function About() {
  return (
    <section id="about" className="section-shell py-24 md:py-32">
      <div className="section-heading">
        <p className="section-kicker">About</p>
        <h2
          data-cursor="text"
          className="display-font max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl"
        >
          Balanced design systems, clear interfaces, and a builder's mindset.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)]">
        <TiltedBentoCard
          transition={revealTransition}
          className="lg:col-span-7 lg:row-span-2"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
            About Me
          </p>
          <h3
            data-cursor="text"
            className="display-font mt-5 max-w-xl text-3xl font-medium leading-tight tracking-[-0.05em] text-white md:text-5xl"
          >
            {profileData.about.headline}
          </h3>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
            {profileData.about.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {profileData.about.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.3rem] border border-white/8 bg-black/20 px-4 py-5"
              >
                <p className="text-[0.64rem] uppercase tracking-[0.28em] text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </TiltedBentoCard>

        <TiltedBentoCard
          transition={{ ...revealTransition, delay: 0.08 }}
          className="lg:col-span-5"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
                Social + Coding Profiles
              </p>
              <h3
                data-cursor="text"
                className="display-font mt-4 text-3xl tracking-[-0.05em] text-white"
              >
                Connected in one place.
              </h3>
            </div>
            <p className="hidden max-w-[10rem] text-right text-sm leading-6 text-zinc-500 md:block">
              Edit usernames, links, and counts in a single config file.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {profileData.profiles.map((profile, index) => (
              <ProfileCard key={profile.label} profile={profile} index={index} />
            ))}
          </div>
        </TiltedBentoCard>

        <TiltedBentoCard
          transition={{ ...revealTransition, delay: 0.14 }}
          className="lg:col-span-5"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
            Skills
          </p>
          <h3
            data-cursor="text"
            className="display-font mt-4 text-3xl tracking-[-0.05em] text-white"
          >
            Clean stack, practical depth.
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400">
            Focused on frontend craft, backend fundamentals, and data-driven
            problem solving without overcomplicating the interface.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profileData.skills.map((skill, index) => (
              <MotionSpan
                key={skill}
                data-cursor="interactive"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="skill-pill"
              >
                {skill}
              </MotionSpan>
            ))}
          </div>
        </TiltedBentoCard>
      </div>
    </section>
  )
}
