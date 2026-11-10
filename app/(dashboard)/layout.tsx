import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { listWorkflows } from "@/features/workflows/data"
import { auth } from "@/lib/auth"
import { requireOrganization } from "@/lib/auth-server"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session, organizationId } = await requireOrganization()
  const requestHeaders = await headers()

  const [organizations, workflows, sessions, organization, activeMember] =
    await Promise.all([
      auth.api.listOrganizations({ headers: requestHeaders }),
      listWorkflows(organizationId),
      auth.api.listSessions({ headers: requestHeaders }),
      auth.api.getFullOrganization({
        headers: requestHeaders,
        query: { organizationId },
      }),
      auth.api.getActiveMember({ headers: requestHeaders }),
    ])

  if (!organization) {
    redirect("/choose-organization")
  }

  return (
    <SidebarProvider className="h-svh">
      <AppSidebar
        workflows={workflows}
        organizations={organizations ?? []}
        activeOrganizationId={organizationId}
        settings={{
          user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image ?? null,
          },
          sessions: (sessions ?? []).map((item) => ({
            id: item.id,
            token: item.token,
            createdAt: item.createdAt.toISOString(),
            expiresAt: item.expiresAt.toISOString(),
            ipAddress: item.ipAddress ?? null,
            userAgent: item.userAgent ?? null,
          })),
          currentSessionToken: session.session.token,
          organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
            logo: organization.logo ?? null,
          },
          members: organization.members.map((member) => ({
            id: member.id,
            userId: member.userId,
            role: member.role,
            createdAt: member.createdAt.toISOString(),
            user: {
              id: member.user.id,
              name: member.user.name,
              email: member.user.email,
              image: member.user.image ?? null,
            },
          })),
          currentUserId: session.user.id,
          currentRole: activeMember?.role ?? "member",
        }}
      />
      <SidebarInset className="min-h-0 overflow-hidden bg-background">
        <DashboardHeader workflows={workflows} />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
