import { Journal } from '@/components/journal/Journal';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center perspective-container">
      <Journal />
    </main>
  );
}
