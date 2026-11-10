import { cn } from "@/lib/utils"

export const Logo = ({
  className,
  uniColor,
}: {
  className?: string
  uniColor?: boolean
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-foreground",
        className
      )}
    >
      <LogoIcon uniColor={uniColor} />
      <span className="text-lg font-semibold tracking-tight">6N7</span>
    </span>
  )
}

export const LogoIcon = ({
  className,
  uniColor,
}: {
  className?: string
  uniColor?: boolean
}) => {
  return (
    <svg
      className={cn("size-6 shrink-0", className)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="6n7-mark"
          x1="4"
          y1="2"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B99FE" />
          <stop offset="1" stopColor="#2BC8B7" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        fill={uniColor ? "currentColor" : "url(#6n7-mark)"}
      />
      <path
        d="M16 12v4m0 0 6 4m-6-4-6 4"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9" r="3" fill="var(--background)" />
      <circle cx="23" cy="21" r="3" fill="var(--background)" />
      <circle cx="9" cy="21" r="3" fill="var(--background)" />
    </svg>
  )
}
