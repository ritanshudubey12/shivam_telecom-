export default function BlogListingLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-navy py-16 text-center text-white">
        <div className="container max-w-2xl flex flex-col items-center">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="mt-4 h-10 w-3/4 rounded-lg bg-white/15" />
          <div className="mt-3 h-5 w-1/2 rounded bg-white/10" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="container py-14">
        <div className="mb-10 flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-muted/70" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border/70 p-0">
              <div className="h-48 bg-muted/60" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-20 rounded bg-muted/70" />
                <div className="h-6 w-4/5 rounded bg-muted/80" />
                <div className="h-4 w-full rounded bg-muted/50" />
                <div className="h-4 w-3/4 rounded bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

