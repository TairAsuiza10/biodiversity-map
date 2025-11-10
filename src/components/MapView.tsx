'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import speciesData from '@/data/species.json';
import MarkerPopup from './MarkerPopup';

// Cargamos los componentes de react-leaflet dinámicamente (sin SSR)
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

export default function MapView() {
  const [L, setL] = useState<any>(null);

  // ✅ Importamos Leaflet sólo en el cliente (evita "window is not defined")
  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet);
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });
    });
  }, []);

  if (!L) return <p className="text-center mt-10">🗺️ Cargando mapa...</p>;

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[-3.75, -73.25]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔹 Cargamos dinámicamente todos los marcadores desde el JSON */}
        {speciesData.map(sp => (
          <Marker key={sp.id} position={[sp.latitude, sp.longitude]}>
            <Popup>
              <MarkerPopup
                name={sp.name}
                scientificName={sp.scientificName}
                description={sp.description}
                image={sp.image}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
