import { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData } from '../data/profileData'

const MotionButton = motion.button
const MotionForm = motion.form
const MotionSpan = motion.span

function InputField({ label, name, type = 'text', placeholder, textarea }) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-zinc-500">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows="5"
          placeholder={placeholder}
          className="contact-input resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="contact-input"
        />
      )}
    </label>
  )
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <section id="contact" className="section-shell py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 className="display-font mt-5 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
            Let's create something sharp, minimal, and memorable.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
            {profileData.contact.description}
          </p>

          <a
            href={`mailto:${profileData.contact.email}`}
            data-cursor="interactive"
            className="mt-8 inline-flex items-center gap-3 text-sm text-[#9cffcb] transition duration-300 hover:text-white"
          >
            <span className="h-px w-12 bg-[#00ff88]/35" />
            {profileData.contact.email}
          </a>
        </div>

        <MotionForm
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(event) => {
            event.preventDefault()
            setIsSubmitted(true)
          }}
          className="bento-card"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <InputField label="Name" name="name" placeholder="Your name" />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <InputField
              label="Project"
              name="project"
              placeholder="Portfolio, dashboard, website..."
            />
            <InputField
              label="Budget"
              name="budget"
              placeholder="Approx range"
            />
          </div>

          <div className="mt-5">
            <InputField
              label="Message"
              name="message"
              placeholder="Tell me what you're building and how it should feel."
              textarea
            />
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-zinc-400">
              {isSubmitted
                ? 'The button state is animated and ready for a real form endpoint.'
                : 'Focused states are intentionally subtle: stronger green, cleaner contrast, no noise.'}
            </p>

            <MotionButton
              type="submit"
              layout
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="interactive"
              className={`contact-cta ${isSubmitted ? 'is-submitted' : ''}`}
            >
              <span className="trace-button__line trace-button__line--top" />
              <span className="trace-button__line trace-button__line--right" />
              <span className="trace-button__line trace-button__line--bottom" />
              <span className="trace-button__line trace-button__line--left" />

              <span className="relative z-10 grid min-w-[12rem] grid-cols-[1.25rem_1fr_1.25rem] items-center gap-3">
                {!isSubmitted ? (
                  <MotionSpan
                    layoutId="submit-arrow"
                    className="justify-self-start text-base"
                  >
                    {'->'}
                  </MotionSpan>
                ) : (
                  <span aria-hidden="true" />
                )}

                <span className="justify-self-center text-sm font-medium tracking-[0.18em]">
                  {isSubmitted ? 'MESSAGE SENT' : 'SEND MESSAGE'}
                </span>

                {isSubmitted ? (
                  <MotionSpan
                    layoutId="submit-arrow"
                    className="justify-self-end text-base"
                  >
                    {'->'}
                  </MotionSpan>
                ) : (
                  <span aria-hidden="true" />
                )}
              </span>
            </MotionButton>
          </div>
        </MotionForm>
      </div>
    </section>
  )
}
