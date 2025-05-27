import React from 'react';

function Card({ card }) {
  return (
    <div
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
  );
}

export default Card;
