'use client';

import { motion } from 'framer-motion';
import { easings } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { WarningLabel } from '@/components/decorative/WarningLabel';
import { Tape } from '@/components/decorative/Tape';

interface JournalCoverProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function JournalCover({ isOpen, onToggle, className }: JournalCoverProps) {
  return (
    <motion.div
      className={cn('absolute inset-0 cursor-pointer', 'origin-left preserve-3d', className)}
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
          'bg-cover-dark',
          'rounded-r-sm shadow-lifted',
          'flex flex-col items-center justify-center',
          'border-r-4 border-cover-accent/50',
        )}
      >
        {/* Cover texture overlay */}
        <div className="absolute inset-0 texture-grain opacity-60 rounded-r-sm" />
        <div className="absolute inset-0 texture-scuff opacity-40 mix-blend-overlay" />

        {/* Industrial Border */}
        <div className="absolute inset-6 border-2 border-dashed border-white/10 rounded-sm" />

        {/* Tape Elements */}
        <Tape className="top-10 -right-4 rotate-[15deg]" variant="masking" />
        <Tape className="bottom-20 -left-6 rotate-[-5deg]" variant="warning" />

        {/* Title Block */}
        <div className="relative z-10 text-center px-8 p-12 border-2 border-white/20 bg-black/20 backdrop-blur-sm transform -rotate-1">
          <h1 className="font-industrial text-4xl md:text-5xl text-white/90 tracking-wider mb-2 uppercase">
            Hand Ledger
          </h1>
          <div className="w-full h-px bg-white/20 mx-auto my-4" />
          <p className="font-industrial text-sm text-white/50 tracking-[0.2em] uppercase">
            Auth. Personnel Only // Level 4
          </p>
          
          {/* Rivets */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/10" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/10" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/10" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/10" />
        </div>

        {/* Warning Label */}
        <div className="absolute bottom-12 right-12 transform rotate-2">
            <WarningLabel text="CONFIDENTIAL" subtext="DO NOT REMOVE" variant="red" />
        </div>

        {/* Spine shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
          }}
        />
      </div>

      {/* Back face of cover (inside) */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-gray-900',
          'rounded-l-sm',
          '[transform:rotateY(180deg)]',
        )}
      >
        {/* Inside cover content */}
        <div className="absolute inset-0 p-8 flex flex-col">
          {/* Textures */}
          <div className="absolute inset-0 texture-grain opacity-40" />
          <div className="absolute inset-0 bg-cover-accent/10" />

          {/* Property Of Card */}
          <div className="relative z-10 bg-paper-base p-6 shadow-sm transform rotate-1 max-w-sm mt-10 mx-auto w-full">
            <Tape className="-top-3 left-1/2 -translate-x-1/2" variant="clear" />
            
            <h3 className="font-industrial text-lg font-bold mb-4 uppercase tracking-wider text-ink-main border-b-2 border-black pb-2">
              Property Log
            </h3>
            
            <div className="space-y-4 font-industrial text-sm text-ink-main/80">
              <div className="flex justify-between border-b border-black/20 pb-1">
                <span>UNIT:</span>
                <span className="font-mono">734-ALPHA</span>
              </div>
              <div className="flex justify-between border-b border-black/20 pb-1">
                <span>HOLDER:</span>
                <span className="font-mono text-ink-red">UNASSIGNED</span>
              </div>
              <div className="flex justify-between border-b border-black/20 pb-1">
                <span>STATUS:</span>
                <span className="font-bold">ACTIVE</span>
              </div>
            </div>
            
             <div className="mt-6 text-[0.6rem] uppercase tracking-widest text-center opacity-50">
                Form 82-B // Dept of Records
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
