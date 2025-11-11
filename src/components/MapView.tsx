/*'use client';

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

        {/* 🔹 Cargamos dinámicamente todos los marcadores desde el JSON *//*}        
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


*/


'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import speciesData from '@/data/species.json';
import MarkerPopup from './MarkerPopup';
import FilterPanel from './FilterPanel';

// 🔹 Cargamos react-leaflet dinámicamente (sin SSR)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapView() {
  const [L, setL] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // ✅ Aseguramos que el código se ejecute sólo en cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Importamos Leaflet solo en cliente (previene "window is not defined")
  useEffect(() => {
    if (!isClient) return;

    import('leaflet').then(leaflet => {
      setL(leaflet);
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });
    });
  }, [isClient]);

  // 🔹 Extraer categorías únicas desde el JSON
  const categories = useMemo(
    () => Array.from(new Set(speciesData.map(sp => sp.category))).sort(),
    []
  );

  // 🔹 Manejar selección/deselección de filtros
  const handleToggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  // 🔹 Filtrar especies según las categorías activas
  const filteredSpecies =
    selectedCategories.length === 0
      ? speciesData
      : speciesData.filter(sp => selectedCategories.includes(sp.category));

  // 🕓 Esperar a que Leaflet y el cliente estén listos
  if (!isClient || !L)
    return <p className="text-center mt-10">🗺️ Cargando mapa...</p>;

  return (
    <div className="relative h-screen w-full">
      {/* Panel lateral de filtros */}
      <FilterPanel
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />

      {/* Mapa principal */}
      <MapContainer
        key="leaflet-map" // 🔑 evita reuso del contenedor
        center={[-3.75, -73.25]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredSpecies.map(sp => (
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
