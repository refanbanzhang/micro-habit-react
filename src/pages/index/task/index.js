import { useState, useEffect } from 'react';
import { Card } from '@douyinfe/semi-ui';
import * as taskApi from '@/apis/task';
import * as recordApi from '@/apis/record';

import styles from './style.less';

function getPercent(obj) {
  const percent = obj.value / obj.target;
  return (percent * 100).toFixed(2);
}

function Task() {
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
        date: '2024-01-16',
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
  }, [tasks]);

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
          <div>进度：{getPercent(item)}</div>
        </Card>
      ))}
    </div>
  );
}

export default Task;
