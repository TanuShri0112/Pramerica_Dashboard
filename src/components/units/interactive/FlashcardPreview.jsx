import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export const FlashcardGridPreview = ({ flashcards }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500 text-center">No flashcards configured</p>
      </div>
    );
  }

  const toggleCard = (index) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const resetAllCards = () => {
    setFlippedCards([]);
  };

  const renderCardSide = (card, side) => {
    const type = side === 'front' ? (card.frontType || 'text') : (card.backType || 'text');
    const text = side === 'front' ? card.front : card.back;
    const image = side === 'front' ? card.frontImage : card.backImage;

    return (
      <>
        <div className="text-xs text-gray-500 mb-2 uppercase">
          {side === 'front' ? 'FRONT' : 'BACK'}
        </div>
        {type === 'image' && image ? (
          <img 
            src={image} 
            alt={`${side} side`} 
            className="w-full h-24 object-cover rounded mb-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <p className="text-sm font-medium text-center">{text || `${side} side content`}</p>
        )}
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Flashcard Grid ({flashcards.length} cards)</h3>
        <Button variant="outline" size="sm" onClick={resetAllCards}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {flashcards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          
          return (
            <Card 
              key={index}
              className="cursor-pointer transition-all duration-300 hover:shadow-md min-h-[160px]"
              onClick={() => toggleCard(index)}
            >
              <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
                {!isFlipped ? renderCardSide(card, 'front') : renderCardSide(card, 'back')}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500">
        Click on any card to flip it
      </div>
    </div>
  );
};

export default FlashcardGridPreview;