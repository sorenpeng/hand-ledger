'use client';

import { Ephemera, Lace, OldPhoto, VintageStamp } from '@/components/decorative';
import { Envelope, Letter, Tag } from '@/components/interactive';
import { ScatteredCollage } from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const photoAlbumPage: PageContent = {
  id: 'photo-album',
  texture: 'cream',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-xl text-ink-brown mb-3">Photo Album</h2>

      {/* Main photo layout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Large polaroid */}
        <div className="col-span-2 flex justify-center">
          <OldPhoto width={160} height={130} style="polaroid" caption="Summer 1987" />
        </div>

        {/* Smaller photos */}
        <div className="flex justify-center">
          <OldPhoto width={100} height={80} style="cabinet" caption="The old house" />
        </div>

        <div className="flex justify-center">
          <OldPhoto width={100} height={80} style="snapshot" caption="Beach day" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-between items-center mt-4">
        <Tag size="sm" variant="bookmark" color="#e8dcc8">
          <p className="handwriting text-ink-brown text-xs">memories</p>
        </Tag>

        <VintageStamp variant="postage" size="sm" />

        <Lace variant="border" size={60} opacity={0.4} />
      </div>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Photo Notes</h2>

      {/* Photo description cards */}
      <div className="space-y-3">
        <Ephemera variant="card" width={240} height={70} aged>
          <div className="p-2">
            <p className="typewriter text-ink-faded text-xs">SUMMER 1987</p>
            <p className="handwriting text-ink-sepia text-sm mt-1">
              The day we moved into our first home. Mom made lemonade...
            </p>
          </div>
        </Ephemera>

        {/* Letter with photo story */}
        <Envelope size="sm" color="kraft">
          <Letter>
            <p className="handwriting text-ink-sepia text-xs leading-relaxed">
              Dear future me,
              <br />
              <br />
              Remember this day? The sun was setting and everything felt possible...
              <br />
              <br />
              With love,
              <br />
              Your younger self
            </p>
          </Letter>
        </Envelope>

        {/* Photo credit */}
        <div className="text-center">
          <p className="typewriter text-ink-faded/50 text-xs">Photos from the family archive</p>
        </div>
      </div>
    </div>
  ),
};

export const photoScatterPage: PageContent = {
  id: 'photo-scatter',
  texture: 'aged',
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-2">Scattered Memories</h2>

      <ScatteredCollage
        width="100%"
        height={280}
        seed={98}
        rotationRange={[-15, 15]}
        scaleRange={[0.8, 1.1]}
        className="bg-paper-aged/10 rounded"
      >
        <OldPhoto width={80} height={60} style="polaroid" caption="1" />
        <OldPhoto width={70} height={55} style="cabinet" />
        <OldPhoto width={75} height={55} style="snapshot" />
        <VintageStamp variant="airmail" size="sm" cancelled />
        <Ephemera variant="label" width={60} height={35}>
          <p className="typewriter text-ink-faded text-xs p-1">Archive</p>
        </Ephemera>
      </ScatteredCollage>
    </div>
  ),
  backContent: (
    <div className="p-6 h-full flex items-center justify-center">
      <div className="text-center">
        <p className="handwriting text-ink-sepia text-lg mb-2">Every photo tells a story</p>
        <p className="typewriter text-ink-faded text-xs">
          ...some stories are better left unwritten
        </p>
      </div>
    </div>
  ),
};
