export default function Stats() {
  return (
    <section className="bg-canvas p-1">
      <div className="rounded-md bg-[#0A0A0A] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground lg:text-5xl">
            <span className="text-foreground">Built to run.</span> Built to
            share.
          </p>

          <div className="mt-32 grid gap-12 md:grid-cols-3 xl:mt-44">
            <div className="space-y-3 border-t border-canvas pt-6">
              <div className="text-5xl font-semibold tracking-tight text-brand">
                6
              </div>
              <p className="text-muted-foreground">
                Action nodes, from URL to email
              </p>
            </div>
            <div className="space-y-3 border-t border-canvas pt-6">
              <div className="text-5xl font-semibold tracking-tight text-brand">
                4
              </div>
              <p className="text-muted-foreground">
                AI primitives: act, extract, observe, agent
              </p>
            </div>
            <div className="space-y-3 border-t border-canvas pt-6">
              <div className="text-5xl font-semibold tracking-tight text-brand">
                100%
              </div>
              <p className="text-muted-foreground">
                Runs captured with step-level logs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
