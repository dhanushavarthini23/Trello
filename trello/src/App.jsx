import React, { useState } from 'react';
import List from './components/List';

function App() {
  const [lists, setLists] = useState([]);

  const addList = () => {
    const title = prompt('Enter the list title:');
    if (title) {
      const newList = {
        id: Date.now().toString(),
        title,
        cards: [],
      };
      setLists((prev) => [...prev, newList]);
    }
  };

  const handleDrop = (e, listId) => {
    const cardId = e.dataTransfer.getData('cardId');
    const sourceListId = e.dataTransfer.getData('sourceListId');
    
    if (sourceListId === listId) return; // Don't allow moving within the same list

    const sourceList = lists.find((list) => list.id === sourceListId);
    const destinationList = lists.find((list) => list.id === listId);
    const card = sourceList.cards.find((card) => card.id === cardId);

    // Remove the card from the source list
    const updatedSourceList = {
      ...sourceList,
      cards: sourceList.cards.filter((c) => c.id !== cardId),
    };

    // Add the card to the destination list
    const updatedDestinationList = {
      ...destinationList,
      cards: [...destinationList.cards, card],
    };

    // Update lists state
    const updatedLists = lists.map((list) =>
      list.id === sourceList.id
        ? updatedSourceList
        : list.id === destinationList.id
        ? updatedDestinationList
        : list
    );

    setLists(updatedLists);
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px', overflowX: 'auto' }}>
      {lists.map((list) => (
        <List
          key={list.id}
          list={list}
          setLists={setLists}
          lists={lists}
          handleDrop={handleDrop}
        />
      ))}
      <button onClick={addList}>+ Add List</button>
    </div>
  );
}

export default App;
