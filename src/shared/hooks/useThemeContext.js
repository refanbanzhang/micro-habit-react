import { useContext } from 'react';
import ThemeContext from '@/shared/ThemeContext';

function useThemeContext() {
  return useContext(ThemeContext);
}

export default useThemeContext;
