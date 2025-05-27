import React from 'react';
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Task ${i + 1}`);

  return (
    <div style={{ margin: '20px' }}>
      <h2>Virtualized Task List</h2>
      <List
        height={400}         // Total height of the scrollable area
        itemCount={items.length}  // Total number of items
        itemSize={50}        // Height of each item (must be fixed)
        width={400}          // Width of the list
      >
        {({ index, style }) => (
          <div
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #ccc',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
            }}
          >
            {items[index]}
          </div>
        )}
      </List>
    </div>
  );
};

export default VirtualizedList;