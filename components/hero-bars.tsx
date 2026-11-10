const bars = [
  { height: 86, opacity: 0.9 },
  { height: 76, opacity: 0.82 },
  { height: 66, opacity: 0.74 },
  { height: 57, opacity: 0.66 },
  { height: 49, opacity: 0.58 },
  { height: 43, opacity: 0.5 },
  { height: 38, opacity: 0.44 },
  { height: 34, opacity: 0.38 },
  { height: 31, opacity: 0.34 },
  { height: 34, opacity: 0.38 },
  { height: 38, opacity: 0.44 },
  { height: 43, opacity: 0.5 },
  { height: 49, opacity: 0.58 },
  { height: 57, opacity: 0.66 },
  { height: 66, opacity: 0.74 },
  { height: 76, opacity: 0.82 },
  { height: 86, opacity: 0.9 },
]

export function HeroBars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[18%] bottom-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
    >
      <div className="flex h-full w-full items-end gap-1 px-1 sm:gap-2 sm:px-2 md:gap-4 md:px-4">
        {bars.map((bar, index) => (
          <div key={index} className="flex h-full flex-1 items-end">
            <div
              className="w-full bg-gradient-to-t from-foreground/20 via-foreground/5 to-transparent dark:from-foreground/80 dark:via-foreground/15"
              style={{
                height: `${bar.height}%`,
                opacity: bar.opacity,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
