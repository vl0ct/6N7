export function toOrganizationSlug(name: string) {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 32) || "workspace"

  const suffix = crypto.randomUUID().slice(0, 6)
  return `${base}-${suffix}`
}
