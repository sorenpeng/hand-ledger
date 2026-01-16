'use client';

import { Ephemera, Postcard, Receipt, TicketStub, VintageStamp } from '@/components/decorative';
import { Envelope, Letter, Pocket } from '@/components/interactive';
import { AbsoluteLayer, LayerStack } from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const travelMemoriesPage: PageContent = {
  id: 'travel-memories',
  texture: 'aged',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-xl text-ink-brown mb-3">Travel Memories</h2>

      <LayerStack width="100%" height={280} className="relative">
        {/* Background - faded map texture effect */}
        <AbsoluteLayer x="5%" y="5%" depth="base">
          <div className="w-full h-full opacity-20 bg-gradient-to-br from-paper-aged via-coffee-light/20 to-paper-aged rounded" />
        </AbsoluteLayer>

        {/* Train ticket */}
        <AbsoluteLayer x="5%" y="10%" depth="content" rotation={-5}>
          <TicketStub event="TRAIN" number="1847" rotation={0} />
        </AbsoluteLayer>

        {/* Airmail stamp */}
        <AbsoluteLayer x="70%" y="5%" depth="decoration" rotation={12}>
          <VintageStamp variant="airmail" size="md" cancelled />
        </AbsoluteLayer>

        {/* Pocket with boarding pass */}
        <AbsoluteLayer x="50%" y="35%" depth="interactive">
          <Pocket width={150} height={100} pattern="kraft">
            <div className="p-2">
              <p className="typewriter text-ink-sepia text-xs">BOARDING PASS</p>
              <p className="handwriting text-ink-brown text-sm mt-1">Flight 742</p>
              <p className="typewriter text-ink-faded text-xs mt-1">CDG → JFK</p>
            </div>
          </Pocket>
        </AbsoluteLayer>

        {/* Hotel receipt */}
        <AbsoluteLayer x="10%" y="55%" depth="content" rotation={3}>
          <Receipt variant="store" width={100} rotation={0} storeName="HOTEL RITZ" />
        </AbsoluteLayer>

        {/* Commemorative stamp */}
        <AbsoluteLayer x="75%" y="60%" depth="decoration" rotation={-8}>
          <VintageStamp variant="commemorative" size="sm" />
        </AbsoluteLayer>

        {/* Handwritten note */}
        <AbsoluteLayer x="30%" y="75%" depth="overlay" rotation={-2}>
          <Ephemera variant="paper" width={120} height={60} aged taped>
            <p className="handwriting text-ink-sepia text-xs p-2">
              The best journey is the one that takes you home
            </p>
          </Ephemera>
        </AbsoluteLayer>
      </LayerStack>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden">
      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Correspondence</h2>

      <div className="flex flex-col gap-4 items-center">
        {/* Postcard */}
        <Postcard
          message="Having a wonderful time in Paris! The Eiffel Tower is even more beautiful than I imagined."
          to="My Dearest Friend"
          rotation={-2}
        />

        {/* Letter in envelope */}
        <Envelope size="md" color="vintage">
          <Letter>
            <p className="handwriting text-ink-sepia text-sm leading-relaxed">
              Dearest,
              <br />
              <br />
              The streets here smell of coffee and croissants. I found the most wonderful little
              bookshop yesterday...
              <br />
              <br />
              Forever yours
            </p>
          </Letter>
        </Envelope>

        {/* Travel quote */}
        <div className="mt-2 text-center">
          <p className="handwriting text-ink-faded/60 text-sm italic">
            &quot;Not all who wander are lost&quot;
          </p>
        </div>
      </div>
    </div>
  ),
};
