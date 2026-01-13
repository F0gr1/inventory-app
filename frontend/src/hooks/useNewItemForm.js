import { useState } from 'react';

export const useNewItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const reset = () => {
    setName('');
    setQuantity('');
  };

  return {
    name,
    quantity,
    setName,
    setQuantity,
    reset
  };
};
