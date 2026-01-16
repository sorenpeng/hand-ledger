// Page content exports
// Each page is a separate module for code splitting

export { welcomePage } from './01-welcome';
export { travelMemoriesPage } from './02-travel-memories';
export { natureCollectionPage } from './03-nature-collection';
export { musicAndArtPage } from './04-music-and-art';
export { recipesPage } from './05-recipes';
export { photoAlbumPage, photoScatterPage } from './06-photo-album';
export { decorativeShowcasePage, interactiveShowcasePage } from './07-interactive-showcase';
export { layeringDemoPage, scatteredLayoutPage } from './08-layering-demo';

// Re-export all pages as an array for easy iteration
import { welcomePage } from './01-welcome';
import { travelMemoriesPage } from './02-travel-memories';
import { natureCollectionPage } from './03-nature-collection';
import { musicAndArtPage } from './04-music-and-art';
import { recipesPage } from './05-recipes';
import { photoAlbumPage, photoScatterPage } from './06-photo-album';
import { decorativeShowcasePage, interactiveShowcasePage } from './07-interactive-showcase';
import { layeringDemoPage, scatteredLayoutPage } from './08-layering-demo';

export const allPages = [
  welcomePage,
  travelMemoriesPage,
  natureCollectionPage,
  musicAndArtPage,
  recipesPage,
  photoAlbumPage,
  photoScatterPage,
  interactiveShowcasePage,
  decorativeShowcasePage,
  layeringDemoPage,
  scatteredLayoutPage,
];
