import { cn } from '@/lib/utils';

interface TapeProps {
  className?: string;
  variant?: 'masking' | 'clear' | 'warning';
  angle?: number;
}

export function Tape({ className, variant = 'masking', angle = 0 }: TapeProps) {
  return (
    <div
      className={cn(
        'absolute h-8 w-32 backdrop-blur-[1px] shadow-sm pointer-events-none z-20',
        variant === 'masking' && 'tape-strip',
        variant === 'clear' && 'tape-clear',
        variant === 'warning' && 'bg-yellow-400/80 border-y-2 border-black/80 flex items-center justify-center overflow-hidden',
        className
      )}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      {variant === 'warning' && (
         <div className="w-full h-full flex items-center justify-around opacity-70">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-full w-2 bg-black -skew-x-12 mx-1" />
            ))}
         </div>
      )}
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay" />
      {/* Jagged edges */}
      <div className="absolute left-[-2px] top-0 bottom-0 w-[4px] bg-inherit [mask-image:linear-gradient(to_right,transparent,black)]" 
           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 80% 10%, 100% 20%, 85% 30%, 100% 40%, 80% 50%, 100% 60%, 85% 70%, 100% 80%, 80% 90%, 100% 100%, 0% 100%)' }} 
      />
      <div className="absolute right-[-2px] top-0 bottom-0 w-[4px] bg-inherit [mask-image:linear-gradient(to_left,transparent,black)]"
           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 20% 10%, 0% 20%, 15% 30%, 0% 40%, 20% 50%, 0% 60%, 15% 70%, 0% 80%, 20% 90%, 0% 100%, 100% 100%)' }}
      />
    </div>
  );
}
