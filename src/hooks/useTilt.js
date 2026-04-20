import { useEffect, useRef } from 'react'

export function useTilt(options = {}) {
  const {
    maxTilt = 8,
    scale = 1.018,
    easing = 0.14,
  } = options

  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current

    if (!element || window.matchMedia('(pointer: coarse)').matches) {
      return undefined
    }

    let frameId = 0
    let targetRotateX = 0
    let targetRotateY = 0
    let currentRotateX = 0
    let currentRotateY = 0
    let targetScale = 1
    let currentScale = 1

    const animate = () => {
      currentRotateX += (targetRotateX - currentRotateX) * easing
      currentRotateY += (targetRotateY - currentRotateY) * easing
      currentScale += (targetScale - currentScale) * easing

      element.style.setProperty('--tilt-rotate-x', `${currentRotateX.toFixed(2)}deg`)
      element.style.setProperty('--tilt-rotate-y', `${currentRotateY.toFixed(2)}deg`)
      element.style.setProperty('--tilt-scale', currentScale.toFixed(4))

      frameId = window.requestAnimationFrame(animate)
    }

    const handlePointerEnter = () => {
      targetScale = scale
      element.classList.add('is-tilting')
    }

    const handlePointerMove = (event) => {
      const bounds = element.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height

      targetRotateY = (x - 0.5) * maxTilt
      targetRotateX = (0.5 - y) * maxTilt

      element.style.setProperty('--tilt-glow-x', `${(x * 100).toFixed(2)}%`)
      element.style.setProperty('--tilt-glow-y', `${(y * 100).toFixed(2)}%`)
    }

    const handlePointerLeave = () => {
      targetRotateX = 0
      targetRotateY = 0
      targetScale = 1
      element.classList.remove('is-tilting')
      element.style.setProperty('--tilt-glow-x', '50%')
      element.style.setProperty('--tilt-glow-y', '50%')
    }

    element.style.setProperty('--tilt-glow-x', '50%')
    element.style.setProperty('--tilt-glow-y', '50%')
    frameId = window.requestAnimationFrame(animate)

    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [easing, maxTilt, scale])

  return ref
}
