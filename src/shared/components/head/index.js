import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Button } from '@douyinfe/semi-ui';
import { logout } from '@/shared/utils';
import router from '@/router';

import styles from './style.less';

const daytime = '白天';
const night = '夜晚';

function Head() {
  const [isDaytime, setIsDayTime] = useState(true);
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
    setIsDayTime(!isDaytime);
  };

  return (
    <div className={styles.container}>
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
            {isDaytime ? daytime : night}模式
          </Button>
          <Button onClick={onLogout}>退出登录</Button>
        </div>
      </div>
    </div>
  );
}

export default Head;
