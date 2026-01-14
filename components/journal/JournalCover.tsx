'use client';

import { motion } from 'framer-motion';
import { easings } from '@/lib/animations';
import { cn } from '@/lib/utils';

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
      {/* Front face of cover - industrial black */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-cover-black',
          'rounded-r-sm shadow-lifted',
          'flex flex-col items-center justify-center',
          'border-r-2 border-cover-edge',
        )}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5 rounded-r-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Security tape stripe at top */}
        <div
          className="absolute top-6 left-0 right-0 h-5 transform -rotate-1"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              #c41e3a 0px,
              #c41e3a 8px,
              #ffffff 8px,
              #ffffff 16px
            )`,
            opacity: 0.9,
          }}
        />

        {/* Main title label */}
        <div className="relative z-10 text-center">
          {/* White label background */}
          <div className="bg-white px-6 py-3 transform rotate-0.5 shadow-contact">
            <h1 className="typewriter text-2xl md:text-3xl text-label-black tracking-wider">
              HAND LEDGER
            </h1>
          </div>

          {/* Red warning label */}
          <div className="mt-3 bg-label-red px-4 py-1.5 transform -rotate-0.5">
            <p className="typewriter text-xs md:text-sm text-white tracking-widest">
              AUTHORIZED PERSONNEL ONLY
            </p>
          </div>
        </div>

        {/* Masking tape strip - diagonal */}
        <div
          className="absolute bottom-12 right-4 w-24 h-6 bg-tape-masking transform rotate-12 opacity-70"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        />

        {/* Small FRAGILE label */}
        <div className="absolute bottom-6 left-4 bg-white border border-label-red px-2 py-1 transform -rotate-2">
          <span className="typewriter text-xs text-label-red tracking-wide">FRAGILE</span>
        </div>

        {/* Edge wear hint */}
        <div
          className="absolute bottom-0 right-0 w-8 h-8"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(60,60,60,1) 50%)',
            borderRadius: '0 0 0.125rem 0',
          }}
        />

        {/* Spine shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
          }}
        />
      </div>

      {/* Back face of cover (inside) */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-cream',
          'rounded-l-sm',
          '[transform:rotateY(180deg)]',
        )}
      >
        {/* Inside cover content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col paper-texture">
          {/* Aged paper effect - behind content */}
          <div className="absolute inset-0 aged-effect" />

          {/* Content layer - above textures */}
          <div className="relative z-10">
            {/* Masking tape at top corner */}
            <div className="absolute -top-2 -right-2 w-16 h-5 bg-tape-masking transform rotate-45 opacity-60" />

            {/* Label strip */}
            <div className="inline-block bg-white border border-ink-muted/30 px-3 py-1 mb-4 transform -rotate-1">
              <span className="typewriter text-xs text-ink-main tracking-wide">
                THIS JOURNAL BELONGS TO:
              </span>
            </div>

            {/* Name line */}
            <div className="w-48 h-px bg-ink-main/40 mb-6 ml-2" />

            {/* Quote with typed look */}
            <div className="mt-auto">
              <p className="typewriter text-ink-muted text-xs leading-relaxed">
                &quot;EVERY PAGE TELLS A STORY,
                <br />
                EVERY POCKET HOLDS A SECRET.&quot;
              </p>
            </div>
          </div>

          {/* Stamp - industrial look */}
          <div className="absolute bottom-6 right-6 w-14 h-14 border-2 border-label-red rounded-full flex items-center justify-center transform rotate-12 opacity-60">
            <span className="typewriter text-label-red text-xs text-center leading-tight">
              DO NOT
              <br />
              COPY
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
