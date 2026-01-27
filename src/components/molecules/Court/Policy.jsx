import { useState } from 'react';

const Policy = ({ item }) => {
  return (
    <div className="p-2">
      <div className="text-md text-justify" dangerouslySetInnerHTML={{ __html: item }} />
    </div>
  );
};

export default Policy;