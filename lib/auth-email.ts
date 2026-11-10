import { resend } from "@/lib/resend"

// Resend only accepts senders on a verified domain. Until AUTH_EMAIL_FROM points
// at one, fall back to Resend's test sender (which can only deliver to your own
// Resend account address).
const from = process.env.AUTH_EMAIL_FROM ?? "6N7 <onboarding@resend.dev>"

function layout({
  heading,
  body,
  action,
  url,
  footnote,
}: {
  heading: string
  body: string
  action: string
  url: string
  footnote: string
}) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f4f4f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;">
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">6N7</p>
                <h1 style="margin:0 0 12px;font-size:20px;line-height:1.3;">${heading}</h1>
                <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#3f3f46;">${body}</p>
                <a href="${url}" style="display:inline-block;background:#18181b;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;padding:10px 18px;border-radius:8px;">${action}</a>
                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#71717a;">${footnote}</p>
                <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#a1a1aa;word-break:break-all;">If the button doesn&apos;t work, paste this link into your browser:<br />${url}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendPasswordResetEmail({
  to,
  name,
  url,
}: {
  to: string
  name: string
  url: string
}) {
  if (!process.env.AUTH_EMAIL_FROM) {
    console.warn(
      "[auth] AUTH_EMAIL_FROM is not set. Resend's test sender only delivers to the account owner's address, so password reset emails to other users will be rejected."
    )
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Reset your 6N7 password",
    html: layout({
      heading: "Reset your password",
      body: `Hi ${name || "there"} — we received a request to reset the password for this account. The link expires in one hour.`,
      action: "Choose a new password",
      url,
      footnote:
        "Didn&apos;t request this? You can ignore this email — your password stays unchanged.",
    }),
  })

  if (error) {
    throw new Error(error.message)
  }
}
