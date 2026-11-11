import { cn } from "@/lib/utils"

export function ResendLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="450 450 900 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1000.46 450C1174.77 450 1278.43 553.669 1278.43 691.282C1278.43 828.896 1174.77 932.563 1000.46 932.563H912.382L1350 1350H1040.82L707.794 1033.48C683.944 1011.47 672.936 985.781 672.935 963.765C672.935 932.572 694.959 905.049 737.161 893.122L908.712 847.244C973.85 829.812 1018.81 779.353 1018.81 713.298C1018.8 632.567 952.745 585.78 871.095 585.78H450V450H1000.46Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function NeonLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M63 0.0177909V63.5526L38.4178 42.2501V63.5526H0V0L63 0.0177909ZM7.72251 55.8389H30.6953V25.3238L55.2779 47.0476V7.72922L7.72251 7.71559V55.8389Z"
        fill="#37C38F"
      />
    </svg>
  )
}

export function BetterAuthLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#fff" d="M0 0h500v500H0z" />
      <path
        fill="#000"
        d="M69 121h86.988v259H69zM337.575 121H430v259h-92.425z"
      />
      <path
        fill="#000"
        d="M427.282 121v83.456h-174.52V121zM430 296.544V380H252.762v-83.456z"
      />
      <path fill="#000" d="M252.762 204.455v92.089h-96.774v-92.089z" />
    </svg>
  )
}

export function LiveblocksLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 23 100 55.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M67.5 23H0l20 20v27.5zm-35 55H100L80 58V30.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function TriggerDevLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 109 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="trigger-dev-gradient"
          x1="88.2367"
          y1="94.4175"
          x2="87.2207"
          y2="27.8737"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41FF54" />
          <stop offset="1" stopColor="#E7FF52" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.569 38.1914L54.5301 0.158447L108.956 94.4175H0.104248L22.0654 56.3834L37.6003 65.3517L31.1753 76.4795H77.885L54.5301 36.0332L48.1051 47.1609L32.569 38.1914Z"
        fill="url(#trigger-dev-gradient)"
      />
    </svg>
  )
}

export function BrowserbaseLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon fill="#FF4500" points="256 256 0 256 0 0 256 0" />
      <path
        d="M161.16736,67.16928 L182.39488,88.39168 L182.39488,111.3856 L168.2432,125.53216 L185.9328,143.22176 L185.9328,167.98208 L164.7104,189.20448 L70.96832,189.20448 L70.97344,67.16928 L161.16736,67.16928 Z M106.45504,140.66688 L106.45504,149.62688 L142.29504,149.62688 L142.29504,140.66688 L106.45504,140.66688 Z M142.29504,101.376 L106.45504,101.376 L106.45504,110.336 L142.29504,110.336 L142.29504,101.376 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
