import React, { useState } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import Card from './Card';

const List = ({ list, setLists, lists, handleDrop }) => {
  const [cardText, setCardText] = useState('');

  const addCard = () => {
    if (cardText.trim()) {
      const updatedLists = lists.map((l) =>
        l.id === list.id
          ? {
              ...l,
              cards: [
                ...l.cards,
                { id: Date.now().toString(), text: cardText },
              ],
            }
          : l
      );
      setLists(updatedLists);
      setCardText('');
    }
  };

  // Drag over event to prevent default behavior and allow dropping
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      onDrop={(e) => handleDrop(e, list.id)}  // Handle drop
      onDragOver={handleDragOver}  // Handle drag over
      style={{
        background: '#f4f4f4',
        padding: '10px',
        width: '250px',
        borderRadius: '5px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <h3>{list.title}</h3>

      {/* Virtualize the card list with react-window */}
      <VirtualList
        height={300}               
        itemCount={list.cards.length}
        itemSize={60}              
        width={230}               
      >
        {({ index, style }) => {
          const card = list.cards[index];

          // Define drag start for each card
          const handleDragStart = (e) => {
            e.dataTransfer.setData('cardId', card.id);
            e.dataTransfer.setData('sourceListId', list.id);
            e.target.style.opacity = '0.5'; // Visual feedback during drag
          };

          const handleDragEnd = (e) => {
            e.target.style.opacity = '1'; // Reset opacity after drag ends
          };

          return (
            <div
              style={style}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Card card={card} listId={list.id} />
            </div>
          );
        }}
      </VirtualList>

      <input
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        placeholder="Enter card title"
        style={{ marginTop: '10px', padding: '5px', width: '100%' }}
      />
      <button onClick={addCard} style={{ marginTop: '5px' }}>Add Card</button>
    </div>
  );
};

export default List;