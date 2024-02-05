import { useEffect, useState } from 'react';
import ThemeContext from '@/shared/ThemeContext';

function ContextProvider(props) {
  const initialContext = localStorage.getItem('context');
  const [state, setState] = useState(initialContext);

  useEffect(() => {
    localStorage.setItem('context', state);
  }, [state]);

  return (
    <ThemeContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ContextProvider;
