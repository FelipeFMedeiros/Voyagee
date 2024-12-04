// components/ItemCarousel.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface ItemCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  onCreateNew?: () => void;
  loading?: boolean;
}

export function ItemCarousel<T>({ 
  items = [], // Valor default para items
  renderItem, 
  title, 
  onCreateNew,
  loading = false
}: ItemCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  // Só calculamos isso se tivermos items
  const canScrollLeft = items.length > 0 && currentIndex > 0;
  const canScrollRight = items.length > 0 && currentIndex + itemsPerPage < items.length;

  const handlePrevious = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {onCreateNew && (
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Criar Novo
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : items?.length > 0 ? (
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {items
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, index) => (
                <div key={index} className="flex-1 min-w-0">
                  {renderItem(item)}
                </div>
              ))}
          </div>

          {canScrollLeft && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Nenhum item encontrado</p>
        </div>
      )}
    </div>
  );
}