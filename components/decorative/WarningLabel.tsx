import { cn } from '@/lib/utils';

interface WarningLabelProps {
  className?: string;
  text?: string;
  subtext?: string;
  variant?: 'red' | 'black' | 'white';
}

export function WarningLabel({ 
  className, 
  text = 'WARNING', 
  subtext,
  variant = 'red' 
}: WarningLabelProps) {
  return (
    <div
      className={cn(
        'relative inline-flex flex-col items-center justify-center p-2 border-2 shadow-sm font-industrial z-10',
        variant === 'red' && 'bg-label-warn-bg text-label-warn-text border-white/20',
        variant === 'black' && 'bg-label-black text-white border-white/20',
        variant === 'white' && 'bg-gray-100 text-black border-black/80',
        className
      )}
    >
      <div className="border border-current px-2 py-0.5 text-xs font-bold tracking-widest uppercase">
        {text}
      </div>
      {subtext && (
        <div className="mt-1 text-[0.5rem] tracking-tight uppercase opacity-80 max-w-[80px] text-center leading-tight">
          {subtext}
        </div>
      )}
      
      {/* Corner screws/rivets */}
      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-current opacity-50" />
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-current opacity-50" />
      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-current opacity-50" />
      <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-current opacity-50" />
    </div>
  );
}
