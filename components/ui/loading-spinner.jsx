import { cn } from '@/lib/utils'

export function LoadingSpinner({ className, ...props }) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]',
        className
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}