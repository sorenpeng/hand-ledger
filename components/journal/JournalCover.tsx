'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { easings } from '@/lib/animations';

interface JournalCoverProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function JournalCover({ isOpen, onToggle, className }: JournalCoverProps) {
  return (
    <motion.div
      className={cn(
        'absolute inset-0 cursor-pointer',
        'origin-left preserve-3d',
        className
      )}
      initial={false}
      animate={{
        rotateY: isOpen ? -170 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: easings.pageTurn,
      }}
      onClick={onToggle}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front face of cover */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950',
          'rounded-r-sm shadow-lifted',
          'flex flex-col items-center justify-center',
          'border-r-4 border-amber-950/50'
        )}
      >
        {/* Cover texture overlay */}
        <div
          className="absolute inset-0 opacity-20 rounded-r-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Decorative border */}
        <div className="absolute inset-4 border-2 border-amber-700/30 rounded-sm" />
        <div className="absolute inset-6 border border-amber-600/20 rounded-sm" />

        {/* Title */}
        <div className="relative z-10 text-center px-8">
          <h1 className="vintage-serif text-4xl md:text-5xl text-amber-100/90 tracking-wide mb-2">
            Hand Ledger
          </h1>
          <div className="w-32 h-px bg-amber-600/40 mx-auto my-4" />
          <p className="handwriting text-xl text-amber-200/70">
            A Junk Journal
          </p>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600/30 rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600/30 rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600/30 rounded-bl-sm" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600/30 rounded-br-sm" />

        {/* Spine shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          }}
        />
      </div>

      {/* Back face of cover (inside) */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-cream',
          'rounded-l-sm',
          '[transform:rotateY(180deg)]'
        )}
      >
        {/* Inside cover content */}
        <div className="absolute inset-0 p-8 flex flex-col">
          {/* Aged paper effect */}
          <div className="absolute inset-0 aged-effect opacity-50" />

          {/* Handwritten note */}
          <div className="relative z-10 handwriting text-ink-sepia text-lg leading-relaxed">
            <p className="mb-4">This journal belongs to...</p>
            <div className="w-48 h-px bg-ink-sepia/30 mb-8" />
            <p className="text-sm text-ink-faded italic">
              &quot;Every page tells a story,<br />
              every pocket holds a secret.&quot;
            </p>
          </div>

          {/* Decorative stamp placeholder */}
          <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full border-2 border-dashed border-ink-faded/30 flex items-center justify-center">
            <span className="text-ink-faded/40 text-xs typewriter">STAMP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
