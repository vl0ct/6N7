import { Inter, Outfit } from "next/font/google"
import { Agentation } from "agentation"

import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "dark" }}
      className={cn(
        "dark scroll-smooth antialiased bg-canvas-frame",
        inter.variable,
        outfitHeading.variable
      )}
    >
      <body>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  )
}
