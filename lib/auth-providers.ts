export type SocialProviderId = "google" | "github"

export type SocialProvider = {
  id: SocialProviderId
  label: string
}

type Credentials = {
  clientId: string
  clientSecret: string
}

const definitions: {
  id: SocialProviderId
  label: string
  env: [clientId: string, clientSecret: string]
}[] = [
  {
    id: "google",
    label: "Google",
    env: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  },
  {
    id: "github",
    label: "GitHub",
    env: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
  },
]

export function getSocialProviderCredentials(
  id: SocialProviderId
): Credentials | null {
  const definition = definitions.find((item) => item.id === id)
  if (!definition) return null

  const [clientIdVar, clientSecretVar] = definition.env
  const clientId = process.env[clientIdVar]
  const clientSecret = process.env[clientSecretVar]

  return clientId && clientSecret ? { clientId, clientSecret } : null
}

/**
 * Providers with credentials are the only ones Better Auth will accept, so the
 * server config and the sign-in buttons both read from here.
 */
export function getSocialProviders(): SocialProvider[] {
  return definitions
    .filter((definition) => getSocialProviderCredentials(definition.id))
    .map(({ id, label }) => ({ id, label }))
}
