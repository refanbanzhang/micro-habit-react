import { RouterProvider } from 'react-router-dom';
import classNames from 'classnames';
import router from '@/router';

import styles from './App.less';

function App() {
  const theme = localStorage.getItem('theme');
  const themeClassName = theme === 'daytime' ? styles.daytime : styles.night;
  return (
    <div className={classNames([styles.container, themeClassName])}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
