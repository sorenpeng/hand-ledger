'use client';

import { CoffeeStain, Ephemera, Receipt } from '@/components/decorative';
import { Pocket, Tag } from '@/components/interactive';
import { AbsoluteLayer, LayerStack } from '@/components/layering';
import type { PageContent } from '@/types/journal';

export const recipesPage: PageContent = {
  id: 'recipes',
  texture: 'stained',
  hasInteractiveElements: true,
  frontContent: (
    <div className="p-4 h-full overflow-hidden relative">
      <h2 className="vintage-serif text-xl text-ink-brown mb-3">Grandma&apos;s Recipes</h2>

      <LayerStack width="100%" height={280} className="relative">
        {/* Coffee stain decoration */}
        <AbsoluteLayer x="70%" y="5%" depth="base">
          <CoffeeStain variant="ring" size="md" intensity="light" />
        </AbsoluteLayer>

        {/* Main recipe card */}
        <AbsoluteLayer x="5%" y="5%" depth="content" rotation={-2}>
          <div className="bg-paper-cream p-4 rounded shadow-paper w-[200px]">
            <h3 className="vintage-serif text-ink-brown text-lg border-b border-ink-faded/30 pb-1 mb-2">
              Apple Pie
            </h3>
            <div className="space-y-1">
              <p className="handwriting text-ink-sepia text-xs">• 6 apples, sliced</p>
              <p className="handwriting text-ink-sepia text-xs">• 3/4 cup sugar</p>
              <p className="handwriting text-ink-sepia text-xs">• 1 tsp cinnamon</p>
              <p className="handwriting text-ink-sepia text-xs">• 1/4 tsp nutmeg</p>
              <p className="handwriting text-ink-sepia text-xs">• 2 tbsp butter</p>
            </div>
            <p className="typewriter text-ink-faded text-xs mt-2 italic">Bake 45 min at 375°F</p>
          </div>
        </AbsoluteLayer>

        {/* Grocery receipt */}
        <AbsoluteLayer x="60%" y="30%" depth="decoration" rotation={8}>
          <Receipt variant="store" width={90} rotation={0} storeName="GROCERY" />
        </AbsoluteLayer>

        {/* Secret recipe pocket */}
        <AbsoluteLayer x="10%" y="60%" depth="interactive">
          <Pocket width={140} height={90} pattern="kraft">
            <div className="p-2">
              <p className="typewriter text-ink-faded text-xs">SECRET INGREDIENT:</p>
              <p className="handwriting text-ink-brown text-sm mt-1">A pinch of love ❤️</p>
            </div>
          </Pocket>
        </AbsoluteLayer>

        {/* Recipe tag */}
        <AbsoluteLayer x="75%" y="70%" depth="decoration">
          <Tag size="sm" variant="gift" color="#f5e6d3">
            <p className="handwriting text-ink-brown text-xs">family</p>
          </Tag>
        </AbsoluteLayer>
      </LayerStack>
    </div>
  ),
  backContent: (
    <div className="p-4 h-full overflow-hidden relative">
      {/* Coffee ring stain */}
      <div className="absolute top-4 right-4">
        <CoffeeStain variant="ring" size="sm" intensity="light" />
      </div>

      <h2 className="vintage-serif text-lg text-ink-brown mb-3">Kitchen Notes</h2>

      <div className="space-y-3">
        {/* Recipe variation */}
        <Ephemera variant="paper" width={240} height={80} aged taped>
          <div className="p-2">
            <p className="typewriter text-ink-faded text-xs mb-1">VARIATION:</p>
            <p className="handwriting text-ink-sepia text-sm">
              Add 1/2 cup cranberries for a tart twist
            </p>
          </div>
        </Ephemera>

        {/* Cooking tips */}
        <div className="bg-paper-aged/40 p-3 rounded">
          <p className="vintage-serif text-ink-brown text-sm mb-2">Grandma&apos;s Tips:</p>
          <ul className="space-y-1">
            <li className="handwriting text-ink-sepia text-xs">
              • Always use cold butter for flaky crust
            </li>
            <li className="handwriting text-ink-sepia text-xs">
              • Let pie rest 20 min before serving
            </li>
            <li className="handwriting text-ink-sepia text-xs">• Granny Smith apples work best</li>
          </ul>
        </div>

        {/* Memory note */}
        <div className="text-center pt-2">
          <p className="handwriting text-ink-faded/60 text-sm italic">
            &quot;The kitchen is the heart of the home&quot;
          </p>
          <p className="typewriter text-ink-faded/40 text-xs mt-1">
            — passed down through generations
          </p>
        </div>
      </div>
    </div>
  ),
};
