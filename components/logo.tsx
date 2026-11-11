import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-foreground",
        className
      )}
    >
      <LogoIcon />
      <span className="text-lg font-semibold tracking-tight">6N7</span>
    </span>
  )
}

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-6 shrink-0", className)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 67 mark */}
      <g
        transform="translate(0.74 0.13) scale(0.0869565)"
        stroke="currentColor"
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="110" cy="250" r="55" />
        <path d="M77.4 68.9 L134.6 45 L59.1 229.1" />
        <path d="M262.8 296.1 L205.6 320 L296 100 H186" />
      </g>
    </svg>
  )
}
