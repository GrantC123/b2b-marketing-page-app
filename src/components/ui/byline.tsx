import * as React from 'react'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BylineAuthor {
  name: string
  href?: string
  /** URL for a circular avatar image */
  avatarSrc?: string
  avatarAlt?: string
}

export interface BylineProps extends React.ComponentProps<'div'> {
  authors?: BylineAuthor[]
  /** Plain-text date string, e.g. "March 17, 2026" */
  date?: string
  /** Estimated read time in minutes, e.g. 6 → "6 min read" */
  readTime?: number
  /** Optional reviewer credit */
  reviewedBy?: string
  /** Size scale */
  size?: 'sm' | 'md'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BylineAvatar({
  src,
  alt,
  size,
}: {
  src?: string
  alt?: string
  size: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt ?? ''}
      className={cn('rounded-full object-cover shrink-0', dim)}
    />
  )
}

// Separator dot between byline sections — matches .t-byline :where(div:not(:last-child)):after
function BylineSeparator() {
  return (
    <span aria-hidden="true">&bull;</span>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function Byline({
  authors = [],
  date,
  readTime,
  reviewedBy,
  size = 'md',
  className,
  ...props
}: BylineProps) {
  const textSize = size === 'sm' ? 'text-sm' : 'text-base'

  return (
    <div
      data-slot="byline"
      className={cn('flex flex-wrap items-center gap-1.5 text-gray-700 leading-relaxed tracking-tighter', textSize, className)}
      {...props}
    >
      {/* Authors */}
      {authors.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            By {` `}
            {authors.map((author, i) => (
              <React.Fragment key={author.name}>
                {i > 0 && <span>&amp;</span>}
                <span className="inline-flex items-center gap-2">
                  {author.avatarSrc && (
                    <BylineAvatar src={author.avatarSrc} alt={author.avatarAlt ?? author.name} size={size} />
                  )}
                  {author.href ? (
                    <a
                      href={author.href}
                      className="font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className="font-bold text-gray-900">{author.name}</span>
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
          {(!!reviewedBy || !!date || readTime != null) && <BylineSeparator />}
        </>
      )}

      {/* Reviewer */}
      {reviewedBy && (
        <>
          <div className="inline-flex items-center gap-1">
            <span className="text-foreground">Reviewed by</span>
            <span className="font-semibold text-accent-foreground">{reviewedBy}</span>
          </div>
          {(!!date || readTime != null) && <BylineSeparator />}
        </>
      )}

      {/* Date */}
      {date && (
        <>
          <time className="text-foreground">{date}</time>
          {readTime != null && <BylineSeparator />}
        </>
      )}

      {/* Read time */}
      {readTime != null && (
        <span className="text-foreground">{readTime} min read</span>
      )}
    </div>
  )
}

export { Byline, BylineSeparator, BylineAvatar }
