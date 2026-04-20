import { useRef } from 'react'
import { useCustomCursor } from '../hooks/useCustomCursor'

export function Cursor() {
  const dotRef = useRef(null)
  const maskRef = useRef(null)

  useCustomCursor(dotRef, maskRef)

  return (
    <>
      <div ref={maskRef} className="custom-cursor custom-cursor--halo" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor custom-cursor--dot" aria-hidden="true" />
    </>
  )
}
