import React from 'react';
import Card from '../Card';

export default function ListComponent({ data, concluded }) {
  return (
    <div>
      {data
        .filter((item) => item.concluded === concluded)
        .map((item) => (
          <Card key={item.id} item={item} />
        ))}
    </div>
  );
}
