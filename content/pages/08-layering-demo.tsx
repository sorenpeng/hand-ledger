'use client';

import {
  Ephemera,
  Lace,
  MusicScrap,
  OldPhoto,
  Receipt,
  TicketStub,
  VintageStamp,
} from '@/components/decorative';
import {
  AbsoluteLayer,
  Collage,
  CollageItem,
  LayerStack,
  ScatteredCollage,
} from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const layeringDemoPage: PageContent = {
  id: 'layering-demo',
  texture: 'cream',
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Layering System</h2>

      {/* LayerStack demo */}
      <LayerStack width="100%" height={200} className="bg-paper-aged/20 rounded">
        {/* Base layer - background */}
        <AbsoluteLayer x={10} y={20} depth="base" rotation={-3}>
          <MusicScrap width={120} height={80} />
        </AbsoluteLayer>

        {/* Content layer - main items */}
        <AbsoluteLayer x={40} y={50} depth="content" rotation={5}>
          <Ephemera variant="card" width={100} height={70} aged>
            <p className="handwriting text-ink-sepia text-xs p-2">Layered!</p>
          </Ephemera>
        </AbsoluteLayer>

        {/* Decoration layer */}
        <AbsoluteLayer x={60} y={30} depth="decoration" rotation={-8}>
          <VintageStamp variant="commemorative" size="sm" />
        </AbsoluteLayer>

        {/* Interactive layer - highest z-index */}
        <AbsoluteLayer x={25} y={100} depth="interactive">
          <TicketStub event="DEMO" number="001" rotation={3} />
        </AbsoluteLayer>
      </LayerStack>

      <p className="typewriter text-ink-faded text-xs mt-2 text-center">
        Layers: base → content → decoration → interactive
      </p>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Collage Composition</h2>

      {/* Collage demo */}
      <Collage width="100%" height={200} animated className="bg-paper-aged/20 rounded">
        <CollageItem config={{ x: 5, y: 10, rotation: -5, depth: 'content' }} animated>
          <OldPhoto width={70} height={50} style="polaroid" caption="1" />
        </CollageItem>

        <CollageItem config={{ x: 45, y: 25, rotation: 8, depth: 'content' }} animated>
          <Receipt variant="ledger" width={80} rotation={0} />
        </CollageItem>

        <CollageItem config={{ x: 20, y: 55, rotation: -3, depth: 'overlay' }} animated>
          <VintageStamp variant="postage" size="sm" cancelled />
        </CollageItem>

        <CollageItem config={{ x: 60, y: 60, rotation: 12, depth: 'decoration' }} animated>
          <Lace variant="corner" size={60} />
        </CollageItem>
      </Collage>

      <p className="typewriter text-ink-faded text-xs mt-2 text-center">
        Hover items to lift • Staggered entrance animation
      </p>
    </div>
  ),
};

export const scatteredLayoutPage: PageContent = {
  id: 'scattered-layout',
  texture: 'aged',
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Scattered Layout</h2>

      {/* ScatteredCollage demo */}
      <ScatteredCollage
        width="100%"
        height={200}
        seed={42}
        rotationRange={[-12, 12]}
        scaleRange={[0.85, 1.1]}
        className="bg-paper-aged/20 rounded"
      >
        <VintageStamp variant="airmail" size="sm" />
        <TicketStub event="RAFFLE" number="7742" />
        <Ephemera variant="label" width={70} height={40}>
          <p className="typewriter text-ink-sepia text-xs p-1">Label</p>
        </Ephemera>
        <OldPhoto width={60} height={45} style="snapshot" />
        <MusicScrap width={80} height={50} />
      </ScatteredCollage>

      <p className="typewriter text-ink-faded text-xs mt-2 text-center">
        Automatically scattered with seeded random positions
      </p>
    </div>
  ),
  backContent: (
    <div className="p-8 h-full flex items-center justify-center">
      <div className="text-center">
        <p className="handwriting text-ink-sepia text-2xl mb-4">The End</p>
        <p className="typewriter text-ink-faded text-xs">...for now</p>
        <div className="mt-6 w-16 h-px bg-ink-faded/30 mx-auto" />
        <p className="handwriting text-ink-faded/60 text-sm mt-4 italic">more pages coming soon</p>
      </div>
    </div>
  ),
};
