import Image from "next/image";

import { cn } from "@/lib/utils";

export type LogoBarItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LogoBarProps = {
  logos: LogoBarItem[];
  className?: string;
};

export default function LogoBar({ logos, className }: LogoBarProps) {
  return (
    <div className="@container w-full overflow-hidden">
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-10 gap-y-6 @lg:gap-x-12",
          className
        )}
      >
        {logos.map(({ src, alt, width, height }) => (
          <li key={alt} className="w-fit">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={`${width}px`}
              className="h-auto max-w-none"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
