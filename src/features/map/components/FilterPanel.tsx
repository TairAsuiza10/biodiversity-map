'use client';

import { useState } from 'react';

type FilterPanelProps = {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
};

export default function FilterPanel({
  categories,
  selectedCategories,
  onToggleCategory,
}: FilterPanelProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="absolute top-4 left-20 bg-white/95 backdrop-blur-md shadow-xl rounded-xl p-4 w-65 border border-gray-300 z-9999">


      {/* Botón para abrir/cerrar (SVG inline) */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar filtros' : 'Abrir filtros'}
        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-105"
      >
        {/* SVG de engranaje simple */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 2.3 16.88l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.3 3.18A2 2 0 0 1 7.12.36l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 10.5 1V1a2 2 0 0 1 4 0v.09c.39.14.75.36 1 .65z" />
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4 w-56 border border-gray-200 transform transition-all duration-200 ${
          open ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <h2 className="text-lg font-bold text-green-800 mb-3">Filtros</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onToggleCategory(cat)}
                  className="accent-green-600"
                />
                <span className="text-sm text-gray-700">{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
