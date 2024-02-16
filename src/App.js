import { RouterProvider } from 'react-router-dom';
import classNames from 'classnames';
import router from '@/router';
import useThemeContext from '@/shared/hooks/useThemeContext';

import styles from './App.less';

function App() {
  const themeContext = useThemeContext();
  const themeClassName = themeContext.state === 'light' ? styles.light : styles.dark;

  return (
    <div className={classNames([styles.container, themeClassName])}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
