import React, { useState } from 'react';
import Card from './Card';

function List({ list, setLists, lists, handleDrop }) {
  const [cardText, setCardText] = useState('');

  const addCard = () => {
    if (!cardText.trim()) return;

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
  };

  const handleDragStart = (e, cardId, listId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceListId', listId);
  };

  return (
    <div
      style={{
        minWidth: '250px',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
      }}
      onDragOver={(e) => e.preventDefault()} // Allow dropping
      onDrop={(e) => handleDrop(e, list.id)} // Handle drop event
    >
      <h3>{list.title}</h3>

      {list.cards.map((card) => (
        <div
          key={card.id}
          draggable
          onDragStart={(e) => handleDragStart(e, card.id, list.id)}
          style={{
            backgroundColor: '#fff',
            margin: '8px 0',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {card.text}
        </div>
      ))}

      <input
        type="text"
        placeholder="Enter card text"
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
      />
      <button onClick={addCard}>Add Card</button>
    </div>
  );
}

export default List;
