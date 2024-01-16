import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import styles from './style.less';

function Head() {
  const [items] = useState([
    {
      name: '习惯',
      path: '/',
    },
    {
      name: '打卡',
      path: '/daily',
    },
  ]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default Head;
