import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function SectionShell({ children, className, id, style }: SectionShellProps) {
  return (
    <section id={id} className={cn("px-4 py-12 md:px-6 lg:py-16", className)} style={style}>
      <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
    </section>
  );
}
