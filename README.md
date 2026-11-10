# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

## Authentication

Authentication and organizations are handled by [Better Auth](https://www.better-auth.com).
Set the following in `.env.local`:

```bash
BETTER_AUTH_SECRET=...   # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000
```

In production, set `BETTER_AUTH_URL` to the public deployment URL (for
example `https://6n7.vercel.app`) and use a different secret.

Social sign-in is opt-in per provider: a provider is only registered when both of
its credentials are present, and the sign-in page hides it otherwise.

```bash
GOOGLE_CLIENT_ID=...        # Google Cloud console -> Credentials -> OAuth client
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...        # optional
GITHUB_CLIENT_SECRET=...
```

Authorized redirect URIs must be registered with each provider:

```
http://localhost:3000/api/auth/callback/google
https://<production-domain>/api/auth/callback/google
```

Password resets are sent with Resend. `AUTH_EMAIL_FROM` must be a sender on a
verified Resend domain; without it the fallback test sender can only deliver to
your own Resend account address.

```bash
AUTH_EMAIL_FROM="6N7 <no-reply@your-domain.com>"
```

Apply the auth tables after pulling schema changes:

```bash
pnpm db:migrate
```

New users sign in with email/password or a social provider, then create an
organization.
