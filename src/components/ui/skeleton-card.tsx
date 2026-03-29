export function SkeletonCard() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="h-3 w-20 bg-muted rounded mb-3" />
      <div className="h-7 w-16 bg-muted rounded mb-2" />
      <div className="h-2.5 w-24 bg-muted rounded" />
    </div>
  );
}
