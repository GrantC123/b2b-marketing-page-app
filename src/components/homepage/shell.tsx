import {
  sectionPaddingClassName,
} from "@/components/common/section-shell";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function SectionShell({ children, className, id, style }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(sectionPaddingClassName, className)}
      style={style}
    >
      <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
    </section>
  );
}
