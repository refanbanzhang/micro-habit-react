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
  const themeContextcontext = useThemeContext();
  const [items] = useState([
    {
      name: '先完成一万小时再说吧',
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
    const nextTheme = themeContextcontext.state === 'light' ? 'dark' : 'light';
    themeContextcontext.setState(nextTheme);
  };

  return (
    <div className={classNames([styles.container, styles[themeContextcontext.state]])}>
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
            style={{ marginRight: 10 }}
            onClick={onChangeTheme}
          >
            {themeContextcontext.state === 'light' ? '白天' : '夜晚'}模式
          </Button>
          <Button onClick={onLogout}>退出登录</Button>
        </div>
      </div>
    </div>
  );
}

export default Head;
