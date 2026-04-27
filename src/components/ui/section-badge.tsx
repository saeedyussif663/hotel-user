export default function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
      <span className="size-1.5 rounded-full bg-primary shrink-0" />
      {label}
    </div>
  );
}
