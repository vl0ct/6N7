import { LogoIcon } from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-canvas p-1">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center rounded-md bg-[#0A0A0A] py-18">
          <a
            href="#"
            aria-label="Back to top"
            className="transition-opacity hover:opacity-80"
          >
            <LogoIcon className="size-52" />
          </a>
        </div>

        <div className="rounded-md bg-[#0A0A0A]">
          <div className="mx-auto flex max-w-7xl justify-center px-6 py-6">
            <span className="block text-sm text-muted-foreground">
              67 isnt a meme and we dont larp
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
