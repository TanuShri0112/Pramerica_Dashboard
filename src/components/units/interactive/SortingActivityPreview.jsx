import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export const SortingActivityPreview = ({ 
  title = "Category Sorting Activity", 
  instructions = "Drag cards from the stack below to sort them into the correct categories.",
  items = [
    { id: '1', text: 'Apple', correctCategory: 'Fruits', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=150&fit=crop' },
    { id: '2', text: 'Carrot', correctCategory: 'Vegetables', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=150&fit=crop' },
    { id: '3', text: 'Banana', correctCategory: 'Fruits', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=150&fit=crop' },
    { id: '4', text: 'Broccoli', correctCategory: 'Vegetables' }
  ],
  categories = [
    { id: 'fruits', name: 'Fruits', color: '#fef3c7' },
    { id: 'vegetables', name: 'Vegetables', color: '#dcfce7' }
  ],
  onEdit
}) => {
  const [availableCards, setAvailableCards] = useState([...items]);
  const [categorizedItems, setCategorizedItems] = useState({});
  const [draggedCard, setDraggedCard] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToCategory = (e, categoryId) => {
    e.preventDefault();
    if (!draggedCard) return;

    setAvailableCards(prev => prev.filter(card => card.id !== draggedCard.id));
    
    setCategorizedItems(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(catId => {
        updated[catId] = updated[catId]?.filter(card => card.id !== draggedCard.id) || [];
      });
      
      updated[categoryId] = [...(updated[categoryId] || []), draggedCard];
      return updated;
    });

    setDraggedCard(null);
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    if (!draggedCard) return;

    setCategorizedItems(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(catId => {
        updated[catId] = updated[catId]?.filter(card => card.id !== draggedCard.id) || [];
      });
      return updated;
    });
    
    setAvailableCards(prev => {
      if (prev.find(card => card.id === draggedCard.id)) return prev;
      return [...prev, draggedCard];
    });

    setDraggedCard(null);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetActivity = () => {
    setAvailableCards([...items]);
    setCategorizedItems({});
    setShowResults(false);
  };

  const getCorrectCount = () => {
    let correct = 0;
    Object.keys(categorizedItems).forEach(categoryId => {
      const categoryName = categories.find(cat => cat.id === categoryId)?.name || categoryId;
      categorizedItems[categoryId]?.forEach(item => {
        if (item.correctCategory === categoryName) {
          correct++;
        }
      });
    });
    return correct;
  };

  const getIncorrectCount = () => {
    let incorrect = 0;
    Object.keys(categorizedItems).forEach(categoryId => {
      const categoryName = categories.find(cat => cat.id === categoryId)?.name || categoryId;
      categorizedItems[categoryId]?.forEach(item => {
        if (item.correctCategory !== categoryName) {
          incorrect++;
        }
      });
    });
    return incorrect;
  };

  const renderCard = (card, isCorrect) => (
    <div
      key={card.id}
      draggable
      onDragStart={(e) => handleDragStart(e, card)}
      className={`bg-white rounded-lg border-2 shadow-md cursor-move hover:shadow-lg transition-all duration-200 w-28 h-20 flex flex-col ${
        showResults && isCorrect !== undefined
          ? isCorrect
            ? 'border-green-400 bg-green-50'
            : 'border-red-400 bg-red-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      {card.image && (
        <div className="flex-1 overflow-hidden rounded-t-lg">
          <img
            src={card.image}
            alt={card.text}
            className="w-full h-10 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>
      )}
      <div className="p-1 flex-1 flex items-center justify-center">
        <p className="text-xs text-center text-gray-700 font-medium leading-tight">
          {card.text}
        </p>
      </div>
    </div>
  );

  const renderCategory = (category) => {
    const categoryItems = categorizedItems[category.id] || [];
    
    return (
      <div
        key={category.id}
        className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-3 min-h-[140px]"
        style={{ backgroundColor: category.color || '#f9fafb' }}
      >
        <h3 className="text-base font-bold text-center mb-3 text-gray-800">
          {category.name}
        </h3>
        <div
          className="min-h-[90px] border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-wrap gap-2 justify-center items-start bg-white/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropToCategory(e, category.id)}
        >
          {categoryItems.length > 0 ? (
            categoryItems.map((item) => {
              const isCorrect = showResults ? item.correctCategory === category.name : undefined;
              return renderCard(item, isCorrect);
            })
          ) : (
            <div className="text-center text-gray-500 py-6">
              <p className="text-sm font-medium">Drop items here</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">{instructions}</p>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-200 rounded-lg p-3 shadow-md">
        <p className="text-sm text-orange-800 font-semibold text-center">
          📋 Drag cards from the stack below to sort them into the correct categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => renderCategory(category))}
      </div>

      {(availableCards.length > 0 || !showResults) && (
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold text-center mb-3 text-gray-800">
            Items to Sort
          </h3>
          <div 
            className="min-h-[120px] flex flex-wrap gap-2 justify-center bg-gray-50 rounded-lg p-3"
            onDragOver={handleDragOver}
            onDrop={handleDropToAvailable}
          >
            {availableCards.length > 0 ? (
              availableCards.map((card) => renderCard(card))
            ) : (
              <div className="text-gray-500 text-center py-6">
                <p className="text-sm font-medium">All items have been sorted!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!showResults ? (
          <>
            <Button 
              onClick={checkAnswers} 
              disabled={availableCards.length > 0}
              className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Check Results
            </Button>
            <Button 
              variant="outline" 
              onClick={resetActivity}
              className="px-6 py-2 text-sm font-semibold border-2 shadow-md"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-3 shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Results</h3>
              <div className="flex justify-center gap-6">
                <div className="text-green-600">
                  <span className="font-bold text-2xl">{getCorrectCount()}</span>
                  <div className="text-sm font-semibold mt-1">Correct</div>
                </div>
                <div className="text-red-600">
                  <span className="font-bold text-2xl">{getIncorrectCount()}</span>
                  <div className="text-sm font-semibold mt-1">Incorrect</div>
                </div>
              </div>
            </div>
            <Button 
              onClick={resetActivity} 
              className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingActivityPreview;