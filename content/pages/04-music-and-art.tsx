'use client';

import { Ephemera, Lace, MusicScrap, OldPhoto, VintageStamp } from '@/components/decorative';
import { FlipOut } from '@/components/interactive';
import { Collage, CollageItem } from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const musicAndArtPage: PageContent = {
  id: 'music-and-art',
  texture: 'aged',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-xl text-ink-brown mb-3">Music & Art</h2>

      <Collage width="100%" height={270} animated className="relative">
        {/* Large music sheet background */}
        <CollageItem config={{ x: 5, y: 5, rotation: -2, depth: 'base' }} animated>
          <MusicScrap width={180} height={120} />
        </CollageItem>

        {/* Piano illustration */}
        <CollageItem config={{ x: 55, y: 10, rotation: 5, depth: 'content' }} animated>
          <Ephemera variant="card" width={100} height={80} aged>
            <div className="p-2 text-center">
              <span className="text-3xl">🎹</span>
              <p className="typewriter text-ink-faded text-xs mt-1">Practice daily</p>
            </div>
          </Ephemera>
        </CollageItem>

        {/* Vintage concert photo */}
        <CollageItem config={{ x: 10, y: 45, rotation: -4, depth: 'overlay' }} animated>
          <OldPhoto width={100} height={75} style="cabinet" caption="Concert Hall, 1952" />
        </CollageItem>

        {/* Music note stamp */}
        <CollageItem config={{ x: 70, y: 40, rotation: 15, depth: 'decoration' }} animated>
          <VintageStamp variant="commemorative" size="md" color="#4a3728" />
        </CollageItem>

        {/* Handwritten lyrics snippet */}
        <CollageItem config={{ x: 40, y: 60, rotation: 3, depth: 'content' }} animated>
          <div className="bg-paper-cream/90 p-3 rounded shadow-paper transform">
            <p className="handwriting text-ink-sepia text-sm italic">
              &quot;Music expresses that
              <br />
              which cannot be said...&quot;
            </p>
          </div>
        </CollageItem>

        {/* Decorative lace corner */}
        <CollageItem config={{ x: 75, y: 70, rotation: 0, depth: 'base' }} animated>
          <Lace variant="corner" size={70} opacity={0.4} />
        </CollageItem>
      </Collage>

      <p className="typewriter text-ink-faded text-xs mt-2 text-center">
        hover to lift • click to explore
      </p>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Art Notes</h2>

      <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
        {/* Sketch section */}
        <div className="bg-paper-aged/30 p-3 rounded">
          <p className="typewriter text-ink-faded text-xs mb-2">SKETCHES</p>
          <div className="space-y-2">
            <div className="h-12 border border-dashed border-ink-faded/30 rounded flex items-center justify-center">
              <span className="text-ink-faded/40 text-xs">[ sketch ]</span>
            </div>
            <div className="h-12 border border-dashed border-ink-faded/30 rounded flex items-center justify-center">
              <span className="text-ink-faded/40 text-xs">[ sketch ]</span>
            </div>
          </div>
        </div>

        {/* Color palette */}
        <div className="bg-paper-cream/50 p-3 rounded">
          <p className="typewriter text-ink-faded text-xs mb-2">PALETTE</p>
          <div className="flex gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-full bg-wax-red/60 shadow-inner" />
            <div className="w-8 h-8 rounded-full bg-ink-sepia/60 shadow-inner" />
            <div className="w-8 h-8 rounded-full bg-coffee-stain/60 shadow-inner" />
            <div className="w-8 h-8 rounded-full bg-paper-dark/40 shadow-inner" />
          </div>
          <p className="handwriting text-ink-faded text-xs mt-2">autumn tones</p>
        </div>

        {/* Flip-out with art tip */}
        <div className="col-span-2">
          <FlipOut
            front={
              <div className="bg-tape-cream/70 p-3 text-center">
                <p className="vintage-serif text-ink-brown">Art Tip</p>
                <p className="typewriter text-ink-faded text-xs">tap to reveal</p>
              </div>
            }
            back={
              <div className="bg-paper-cream p-3">
                <p className="handwriting text-ink-sepia text-sm leading-relaxed">
                  Don&apos;t be afraid of mistakes - they often lead to the most interesting
                  discoveries in art.
                </p>
              </div>
            }
            width={240}
            height={70}
            foldFrom="top"
          />
        </div>
      </div>
    </div>
  ),
};
