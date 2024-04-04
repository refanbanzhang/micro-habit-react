import { useContext } from 'react';
import ThemeContext from '@/ThemeContext';

function useThemeContext() {
  return useContext(ThemeContext);
}

export default useThemeContext;
