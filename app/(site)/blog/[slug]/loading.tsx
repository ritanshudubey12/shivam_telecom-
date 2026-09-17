export default function BlogSlugLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="border-b border-border/40 bg-muted/20 py-3">
        <div className="container max-w-3xl flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-muted/60" />
          <span className="text-muted-foreground/40">/</span>
          <div className="h-4 w-16 rounded bg-muted/60" />
          <span className="text-muted-foreground/40">/</span>
          <div className="h-4 w-32 rounded bg-muted/60" />
        </div>
      </div>

      {/* Hero header skeleton */}
      <div className="border-b border-border bg-muted/30 py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="h-6 w-24 rounded-full bg-muted/80" />
          <div className="mt-4 h-10 w-4/5 rounded-lg bg-muted/80" />
          <div className="mt-2 h-10 w-2/3 rounded-lg bg-muted/80" />
          <div className="mt-5 flex items-center gap-4">
            <div className="h-4 w-28 rounded bg-muted/60" />
            <div className="h-4 w-24 rounded bg-muted/60" />
            <div className="h-4 w-20 rounded bg-muted/60" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container max-w-3xl py-12">
        <div className="space-y-4">
          <div className="h-5 w-full rounded bg-muted/60" />
          <div className="h-5 w-11/12 rounded bg-muted/60" />
          <div className="h-5 w-4/5 rounded bg-muted/60" />
          <div className="my-6 h-8 w-1/2 rounded bg-muted/70" />
          <div className="h-5 w-full rounded bg-muted/60" />
          <div className="h-5 w-5/6 rounded bg-muted/60" />
          <div className="h-5 w-3/4 rounded bg-muted/60" />
        </div>
      </div>
    </div>
  );
}

