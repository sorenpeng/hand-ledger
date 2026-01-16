'use client';

import { Ephemera, Lace, OldPhoto } from '@/components/decorative';
import { FlipOut, Tag } from '@/components/interactive';
import { AbsoluteLayer, LayerStack } from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const natureCollectionPage: PageContent = {
  id: 'nature-collection',
  texture: 'cream',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-xl text-ink-brown mb-2">Botanical Notes</h2>

      <LayerStack width="100%" height={290} className="relative">
        {/* Lace doily background */}
        <AbsoluteLayer x="60%" y="0%" depth="base">
          <Lace variant="doily" size={100} opacity={0.3} />
        </AbsoluteLayer>

        {/* Pressed flower illustration */}
        <AbsoluteLayer x="10%" y="8%" depth="content" rotation={-3}>
          <div className="bg-paper-cream/80 p-3 rounded shadow-paper border border-ink-faded/10">
            <div className="w-24 h-32 flex flex-col items-center justify-center">
              <span className="text-4xl opacity-70">🌿</span>
              <p className="handwriting text-ink-sepia text-xs mt-2 text-center">
                Fern leaf
                <br />
                <span className="text-ink-faded">collected Aug 15</span>
              </p>
            </div>
          </div>
        </AbsoluteLayer>

        {/* Botanical sketch */}
        <AbsoluteLayer x="55%" y="15%" depth="content" rotation={5}>
          <Ephemera variant="card" width={110} height={80} aged>
            <div className="p-2 text-center">
              <span className="text-2xl">🍂</span>
              <p className="typewriter text-ink-faded text-xs mt-1">Autumn Oak</p>
            </div>
          </Ephemera>
        </AbsoluteLayer>

        {/* Flip-out with hidden specimen */}
        <AbsoluteLayer x="15%" y="55%" depth="interactive">
          <FlipOut
            front={
              <div className="bg-paper-aged/80 p-2 text-center">
                <p className="typewriter text-ink-faded text-xs">SPECIMEN</p>
                <p className="handwriting text-ink-sepia text-sm">Tap to reveal</p>
              </div>
            }
            back={
              <div className="bg-paper-cream p-2 text-center">
                <span className="text-3xl">🌸</span>
                <p className="handwriting text-ink-sepia text-xs mt-1">Cherry Blossom</p>
                <p className="typewriter text-ink-faded text-xs">Spring 2024</p>
              </div>
            }
            width={120}
            height={80}
            foldFrom="bottom"
          />
        </AbsoluteLayer>

        {/* Nature tag */}
        <AbsoluteLayer x="70%" y="55%" depth="decoration">
          <Tag size="sm" variant="bookmark" color="#e8e0d0">
            <p className="handwriting text-ink-brown text-xs">nature</p>
          </Tag>
        </AbsoluteLayer>

        {/* Photo of garden */}
        <AbsoluteLayer x="50%" y="68%" depth="overlay" rotation={-4}>
          <OldPhoto width={90} height={70} style="polaroid" caption="The garden" />
        </AbsoluteLayer>
      </LayerStack>
    </div>
  ),
  backContent: (
    <div className="p-6 h-full">
      <div className="h-full flex flex-col">
        {/* Nature journal entry */}
        <div className="bg-paper-aged/30 p-4 rounded mb-4">
          <p className="handwriting text-ink-sepia leading-relaxed">
            Today I found the most beautiful fern in the forest. Its delicate fronds unfurled like
            tiny green scrolls, each one a masterpiece of nature&apos;s design...
          </p>
        </div>

        {/* Collection checklist */}
        <div className="flex-1">
          <h3 className="typewriter text-ink-faded text-xs mb-3">COLLECTION</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">✓</span>
              <p className="handwriting text-ink-sepia text-sm">Oak leaves (autumn)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">✓</span>
              <p className="handwriting text-ink-sepia text-sm">Cherry blossoms (spring)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-40">○</span>
              <p className="handwriting text-ink-faded text-sm">Maple leaves (next fall)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-40">○</span>
              <p className="handwriting text-ink-faded text-sm">Wildflowers (summer)</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="text-center pt-4 border-t border-ink-faded/20">
          <p className="handwriting text-ink-faded/60 text-sm italic">
            &quot;In every walk with nature, one receives far more than one seeks.&quot;
          </p>
          <p className="typewriter text-ink-faded/40 text-xs mt-1">— John Muir</p>
        </div>
      </div>
    </div>
  ),
};
