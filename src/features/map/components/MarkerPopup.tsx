'use client';

type MarkerPopupProps = {
  name: string;
  scientificName: string;
  description: string;
  image?: string;
};

export default function MarkerPopup({
  name,
  scientificName,
  description,
  image,
}: MarkerPopupProps) {
  return (
    <div className="text-sm max-w-xs">
      <h3 className="font-bold text-base">{name}</h3>
      <p className="italic text-gray-600">{scientificName}</p>
      <p className="mt-1">{description}</p>

      {image && (
        <img
          src={image}
          alt={name}
          className="mt-2 w-full h-32 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
}
