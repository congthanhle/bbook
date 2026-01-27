import { useState } from 'react';

const Price = ({ item }) => {
  return (
    <div className="px-2">
      <div dangerouslySetInnerHTML={{ __html: item }} />
    </div>
  );
};

export default Price;