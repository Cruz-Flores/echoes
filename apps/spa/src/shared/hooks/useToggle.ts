import { useCallback, useState } from 'react';

export const useToggle = (initial = false) => {
  const [isOn, setIsOn] = useState(initial);
  const toggle = useCallback(() => {
    setIsOn((value) => !value);
  }, []);

  return { isOn, toggle };
};
