import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import classNames from 'classnames';
import router from '@/router';
import ThemeContext from '@/shared/ThemeContext';

import styles from './App.less';

function App() {
  const context = useContext(ThemeContext);
  const themeClassName = context.state === 'light' ? styles.light : styles.dark;

  return (
    <div className={classNames([styles.container, themeClassName])}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
