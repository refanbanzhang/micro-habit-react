import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';
import { getYearDatesUntilToday, getLevelClass } from '@/shared/utils';
import * as recordApi from '@/apis/record';
import * as taskApi from '@/apis/task';

import styles from './style.less';

const year = getYearDatesUntilToday();

function Year(props) {
  const { timestamp } = props;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const taskRes = await taskApi.list();
      const recordRes = await recordApi.list();

      const tasks = taskRes.data;
      const dates = recordRes.data;
      // 得到当前用户没挺任务目标的总时间
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

      const firstValueBiggerThenZeroIndex = list.findIndex((item) => item.value > 0);
      const nextList = list.slice(firstValueBiggerThenZeroIndex);

      setItems(nextList);
      setLoading(false);
    };

    loadData();
  }, [timestamp]);

  if (loading) {
    return <Spin indicator={<IconLoading />} />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.date}
            title={`${item.date} ${item.value}`}
            className={classNames([styles.item, getLevelClass(item.value, item.target, item.allFinished)])}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default Year;
