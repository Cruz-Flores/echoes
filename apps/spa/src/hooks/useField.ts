import { useState } from 'react';

export const useField = (type: string, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const reset = () => {
    setValue('');
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue(event.target.value);
  };

  const input = {
    type,
    value,
    onChange,
  };

  return { input, reset };
};
