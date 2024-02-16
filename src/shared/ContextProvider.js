import { useEffect, useState } from 'react';
import ThemeContext from '@/shared/ThemeContext';

const CONTEXT_KEY = 'context_key';
const DEFAULT_MODE = 'light';

function ContextProvider(props) {
  const initialContext = localStorage.getItem(CONTEXT_KEY) ?? DEFAULT_MODE;
  const [state, setState] = useState(initialContext);

  useEffect(() => {
    localStorage.setItem(CONTEXT_KEY, state);
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
