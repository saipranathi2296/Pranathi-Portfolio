export function TraceButton({
  href,
  children,
  tone = 'default',
  compact = false,
  external = false,
}) {
  const Component = href ? 'a' : 'button'
  const sharedProps = href
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noreferrer' : undefined,
      }
    : {
        type: 'button',
      }

  return (
    <Component
      {...sharedProps}
      data-cursor="interactive"
      className={`trace-button ${tone === 'filled' ? 'trace-button--filled' : ''} ${
        compact ? 'trace-button--compact' : ''
      }`}
    >
      <span className="trace-button__line trace-button__line--top" />
      <span className="trace-button__line trace-button__line--right" />
      <span className="trace-button__line trace-button__line--bottom" />
      <span className="trace-button__line trace-button__line--left" />
      <span className="relative z-10">{children}</span>
    </Component>
  )
}
