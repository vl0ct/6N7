import { Inter, Outfit } from "next/font/google"

import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
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
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, outfitHeading.variable)}
    >
      <body>
        <ClerkProvider appearance={{ theme: shadcn }}>
          <ThemeProvider>
            <header>
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>
              <Show when="signed-in">
                {/* <UserButton /> */}
              </Show>
            </header>
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
