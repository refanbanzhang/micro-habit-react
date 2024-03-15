import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Button } from '@douyinfe/semi-ui';
import { logout } from '@/shared/utils';
import router from '@/router';
import useThemeContext from '@/shared/hooks/useThemeContext';

import styles from './style.less';
import classNames from 'classnames';

function Head() {
  const themeContext = useThemeContext();
  const [items] = useState([
    {
      name: '一万小时',
      path: '/',
    },
    {
      name: '打卡',
      path: '/daily',
    },
  ]);
  const { pathname } = useLocation();

  const onClick = (path) => {
    router.navigate(path);
  };

  const onLogout = () => {
    logout();
    router.navigate('/login');
  };

  const onChangeTheme = () => {
    const nextTheme = themeContext.state === 'light' ? 'dark' : 'light';
    themeContext.setState(nextTheme);
  };

  return (
    <div className={classNames([styles.container, styles[themeContext.state]])}>
      <div className={styles.box}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.path}
              className={classnames([
                styles.item,
                {
                  [styles.active]: pathname === item.path,
                },
              ])}
              onClick={() => onClick(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className={styles.btns}>
          <Button
            size="small"
            className={styles.btn}
            onClick={onChangeTheme}
          >
            {themeContext.state === 'light' ? '白天' : '夜晚'}
          </Button>
          <Button
            size="small"
            className={styles.btn}
            onClick={onLogout}>退出登录</Button>
        </div>
      </div>
    </div>
  );
}

export default Head;
