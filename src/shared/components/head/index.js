import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const onClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.path}
            className={styles.item}
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
