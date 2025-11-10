import MapView from '@/components/MapView';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        🌿 Mapa de Biodiversidad - IIAP
      </h1>
      <MapView />
    </main>
  );
}
