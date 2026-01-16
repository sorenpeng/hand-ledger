'use client';

import type { PageContent } from '@/types/journal';

export const welcomePage: PageContent = {
  id: 'welcome',
  texture: 'cream',
  frontContent: (
    <div className="p-8 h-full flex flex-col">
      <h2 className="vintage-serif text-2xl md:text-3xl text-ink-brown mb-4">Welcome</h2>
      <p className="handwriting text-ink-sepia text-lg md:text-xl leading-relaxed">
        This is your junk journal. Each page is a canvas for memories, ephemera, and beautiful
        chaos.
      </p>
      <div className="mt-auto">
        <p className="typewriter text-ink-faded text-xs">click or swipe to turn pages</p>
      </div>
    </div>
  ),
  backContent: (
    <div className="p-8 h-full">
      <div className="h-full border-2 border-dashed border-ink-faded/20 rounded flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-24 rounded-full border-2 border-ink-faded/30 flex items-center justify-center">
          <span className="handwriting text-ink-faded/50 text-2xl">✿</span>
        </div>
        <p className="typewriter text-ink-faded/40 text-xs">a space for something special</p>
      </div>
    </div>
  ),
};
