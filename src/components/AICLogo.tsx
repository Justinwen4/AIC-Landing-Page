interface AICLogoProps {
  size?: number
  className?: string
}

export default function AICLogo({ size = 32, className = '' }: AICLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="8" fill="#1B4332" />
      {/* Geometric "A" shape formed by converging lines — representing convergence / collective */}
      <path
        d="M12 28L20 10L28 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="15"
        y1="22"
        x2="25"
        y2="22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Three dots representing the "collective" — interconnected nodes */}
      <circle cx="20" cy="10" r="2" fill="white" />
      <circle cx="12" cy="28" r="2" fill="white" />
      <circle cx="28" cy="28" r="2" fill="white" />
    </svg>
  )
}
