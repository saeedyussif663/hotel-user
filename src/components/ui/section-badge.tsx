export default function SectionBadge({ label, dotPosition = 'before' }: { label: string; dotPosition?: 'before' | 'after' }) {
  const dot = <span className="size-1.5 rounded-full bg-primary shrink-0" />;
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
      {dotPosition === 'before' && dot}
      {label}
      {dotPosition === 'after' && dot}
    </div>
  );
}
