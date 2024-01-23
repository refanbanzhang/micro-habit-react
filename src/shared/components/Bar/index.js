import { useState, useEffect } from 'react';
import * as recordApi from '@/apis/record';

import styles from './style.less';

// 将一万小时换算为分钟
const target = 10000 * 60;

function Bar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // TODO: 云对象的单次最大查询长度为1000条，后续需要优化
      const res = await recordApi.totalValue();
      setValue(res);
    };

    loadData();
  }, []);

  const percent = (value / target) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.title}>1万小时定律（{parseInt(value / 60)}/10000）</div>
      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Bar;
