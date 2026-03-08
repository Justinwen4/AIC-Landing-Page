interface AICLogoProps {
  size?: number
  className?: string
}

export default function AICLogo({ size = 32, className = '' }: AICLogoProps) {
  return (
    <img
      src="/aic-logo.png"
      alt="The AI Collective"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ borderRadius: size * 0.15 }}
    />
  )
}
