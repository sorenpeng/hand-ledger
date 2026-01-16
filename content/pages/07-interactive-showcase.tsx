'use client';

import { Ephemera, Lace, MusicScrap, VintageStamp } from '@/components/decorative';
import { Envelope, FlipOut, Letter, Pocket, Tag } from '@/components/interactive';
import type { PageContent } from '@/types/journal';

export const interactiveShowcasePage: PageContent = {
  id: 'interactive-showcase',
  texture: 'cream',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-6 h-full">
      <div className="h-full flex flex-col gap-4">
        <h2 className="vintage-serif text-xl text-ink-brown">Interactive Elements</h2>
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Pocket with hidden note */}
          <div className="flex flex-col items-center gap-2">
            <p className="typewriter text-ink-faded text-xs">Click pocket:</p>
            <Pocket width={140} height={90} pattern="kraft">
              <p className="handwriting text-ink-sepia text-sm">A secret note!</p>
            </Pocket>
          </div>

          {/* Envelope with letter */}
          <div className="flex flex-col items-center gap-2">
            <p className="typewriter text-ink-faded text-xs">Open envelope:</p>
            <Envelope size="sm" color="vintage">
              <Letter>
                <p className="handwriting text-ink-sepia">Dear friend, treasure every moment...</p>
              </Letter>
            </Envelope>
          </div>

          {/* FlipOut section */}
          <div className="flex flex-col items-center gap-2">
            <p className="typewriter text-ink-faded text-xs">Unfold:</p>
            <FlipOut
              front={<p className="handwriting text-ink-sepia text-sm">Click to reveal</p>}
              back={<p className="handwriting text-ink-sepia text-sm">Hidden message!</p>}
              width={130}
              height={80}
              foldFrom="right"
            />
          </div>

          {/* Hanging tag */}
          <div className="flex flex-col items-center gap-2">
            <p className="typewriter text-ink-faded text-xs">Hover tag:</p>
            <Tag size="sm" variant="gift" color="#f5f0e1">
              <p className="handwriting text-ink-brown text-xs">Memories</p>
            </Tag>
          </div>
        </div>
      </div>
    </div>
  ),
  backContent: (
    <div className="p-8 h-full flex items-center justify-center">
      <p className="handwriting text-ink-sepia/60 text-center">
        Flip to see decorative elements...
      </p>
    </div>
  ),
};

export const decorativeShowcasePage: PageContent = {
  id: 'decorative-showcase',
  texture: 'aged',
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Decorative Elements</h2>
      <div className="flex flex-wrap gap-3 items-start">
        {/* Vintage stamps */}
        <div className="flex flex-col items-center">
          <VintageStamp variant="airmail" color="#1e4d6b" size="sm" cancelled />
        </div>

        {/* Music scrap */}
        <MusicScrap width={100} height={70} rotation={-5} />

        {/* Lace corner */}
        <Lace variant="corner" size={70} opacity={0.6} />
      </div>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">More Decorations</h2>
      <div className="flex flex-wrap gap-4 items-start">
        {/* Lace doily */}
        <Lace variant="doily" size={80} />

        {/* Ephemera wrapper */}
        <Ephemera variant="clipping" width={90} height={60} aged taped>
          <p className="handwriting text-ink-sepia text-xs p-2">A clipping...</p>
        </Ephemera>

        {/* Stamp collection */}
        <div className="flex gap-1">
          <VintageStamp variant="postage" size="sm" />
          <VintageStamp variant="commemorative" size="sm" />
        </div>
      </div>
    </div>
  ),
};
