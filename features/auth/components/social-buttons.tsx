"use client"

import { useState } from "react"
import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import type { SocialProvider, SocialProviderId } from "@/lib/auth-providers"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.63h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.44-4.96 3.44-8.56Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.1 0 5.7-1.03 7.62-2.79l-3.72-2.89c-1.03.7-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.7v2.98A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.55 14.68a7.2 7.2 0 0 1 0-4.6V7.1H1.7a12 12 0 0 0 0 10.56l3.85-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.69 0 3.2.58 4.4 1.72l3.3-3.3A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.7 7.1l3.85 2.98C6.46 7.36 9 4.75 12 4.75Z"
      />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58l-.01-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

const icons: Record<SocialProviderId, React.ReactNode> = {
  google: <GoogleIcon />,
  github: <GithubIcon />,
}

/**
 * Renders nothing when no provider has credentials, so forms can mount it
 * unconditionally.
 */
export function SocialButtons({
  providers,
  callbackURL = "/dashboard",
}: {
  providers: SocialProvider[]
  callbackURL?: string
}) {
  const [pending, setPending] = useState<SocialProviderId | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (providers.length === 0) return null

  async function signIn(provider: SocialProviderId) {
    setError(null)
    setPending(provider)

    const { error } = await authClient.signIn.social({ provider, callbackURL })

    // On success the browser is redirected to the provider, so only failures
    // need to reset local state.
    if (error) {
      setError(error.message ?? "Unable to continue with that provider")
      setPending(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            className="w-full"
            disabled={pending !== null}
            onClick={() => signIn(provider.id)}
          >
            {pending === provider.id ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              icons[provider.id]
            )}
            Continue with {provider.label}
          </Button>
        ))}
      </div>
      {error ? <FieldError>{error}</FieldError> : null}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>
    </div>
  )
}
