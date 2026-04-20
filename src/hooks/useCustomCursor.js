import { useEffect } from 'react'

export function useCustomCursor(dotRef, maskRef) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return undefined
    }

    document.documentElement.classList.add('has-custom-cursor')

    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    const dot = { ...target }
    const mask = { ...target }

    let frameId = 0

    const setMode = (mode) => {
      const isInteractive = mode === 'interactive'
      const isText = mode === 'text'

      dotRef.current?.classList.toggle('is-interactive', isInteractive)
      dotRef.current?.classList.toggle('is-text', isText)
      maskRef.current?.classList.toggle('is-interactive', isInteractive)
      maskRef.current?.classList.toggle('is-text', isText)
    }

    const setVisibility = (isHidden) => {
      dotRef.current?.classList.toggle('is-hidden', isHidden)
      maskRef.current?.classList.toggle('is-hidden', isHidden)
    }

    const render = () => {
      dot.x += (target.x - dot.x) * 0.34
      dot.y += (target.y - dot.y) * 0.34
      mask.x += (target.x - mask.x) * 0.16
      mask.y += (target.y - mask.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate3d(-50%, -50%, 0)`
      }

      if (maskRef.current) {
        maskRef.current.style.transform = `translate3d(${mask.x}px, ${mask.y}px, 0) translate3d(-50%, -50%, 0)`
      }

      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      setVisibility(false)
    }

    const handleMouseOver = (event) => {
      const eventTarget = event.target instanceof Element
        ? event.target.closest('[data-cursor], a, button, input, textarea, label')
        : null
      const mode = eventTarget?.getAttribute('data-cursor') ?? (eventTarget ? 'interactive' : 'default')

      setMode(mode)
    }

    const hideCursor = () => setVisibility(true)
    const showCursor = () => setVisibility(false)

    frameId = window.requestAnimationFrame(render)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('blur', hideCursor)
    window.addEventListener('focus', showCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', hideCursor)
    document.addEventListener('mouseenter', showCursor)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', hideCursor)
      window.removeEventListener('focus', showCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', hideCursor)
      document.removeEventListener('mouseenter', showCursor)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [dotRef, maskRef])
}
