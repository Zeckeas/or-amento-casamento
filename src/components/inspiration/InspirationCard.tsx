import React from 'react';
import { Heart } from 'lucide-react';
import { InspirationItem } from '../../types/inspiration';

interface InspirationCardProps {
  item: InspirationItem;
  onFavorite: (id: string) => void;
  onClick: (item: InspirationItem) => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  item,
  onFavorite,
  onClick,
}) => {
  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-64 object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold">{item.title}</h3>
          <p className="text-white/80 text-sm">{item.category}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(item.id);
        }}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          item.favorite ? 'bg-pink-600' : 'bg-white'
        }`}
      >
        <Heart
          className={`w-5 h-5 ${item.favorite ? 'text-white fill-current' : 'text-gray-600'}`}
        />
      </button>
    </div>
  );
};