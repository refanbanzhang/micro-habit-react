import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { getYearDatesUntilToday, getLevelClass } from '@/shared/utils';
import * as recordApi from '@/apis/record';
import * as taskApi from '@/apis/task';

import styles from './style.less';

const year = getYearDatesUntilToday();

function Year() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const taskRes = await taskApi.list();
      const recordRes = await recordApi.list();

      const tasks = taskRes.data;
      const dates = recordRes.data;
      const targetTotalAmount = tasks.reduce((acc, curr) => (acc += curr.target), 0);

      const list = year.map((item) => {
        const dateData = dates.filter((date) => date.date === item.date);
        const value = dateData.reduce((acc, curr) => (acc += curr.value), 0);

        const allFinished = tasks.every((task) => {
          const target = task.target;
          const record = dateData.find((item) => item.name === task.name);
          return record?.value >= target;
        });

        return {
          ...item,
          value,
          allFinished,
          target: targetTotalAmount,
        };
      });

      setItems(list);
    };

    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.date}
            title={`${item.date} ${item.value}`}
            className={classnames([styles.day, getLevelClass(item.value, item.target, item.allFinished)])}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default Year;
