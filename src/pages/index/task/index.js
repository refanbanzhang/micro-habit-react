import { useState, useEffect } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { getToday, getPercent } from '@/shared/utils';
import * as taskApi from '@/apis/task';
import * as recordApi from '@/apis/record';

import styles from './style.less';

function Task() {
  const today = getToday();
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    taskApi.list().then((res) => {
      setTasks(res.data);
    });
  }, []);

  useEffect(() => {
    if (!tasks.length) {
      return;
    }

    const pros = tasks.map((item) =>
      recordApi.list({
        date: today,
        name: item.name,
      }),
    );
    Promise.all(pros).then((reses) => {
      const records = reses.flatMap((res) => res.data);
      const nextTasks = tasks.map((task) => {
        const date = records.find((date) => task.name === date.name);
        return {
          ...task,
          value: date?.value ?? 0,
        };
      });

      setItems(nextTasks);
    });
  }, [today, tasks]);

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Card
          key={item._id}
          title={item.name}
          className={styles.card}
          style={{ maxWidth: '50%' }}
        >
          <div>目标：{item.target}</div>
          <div>已完成：{item.value}</div>
          <div>进度：{getPercent(item.value, item.target)}</div>
        </Card>
      ))}
    </div>
  );
}

export default Task;
