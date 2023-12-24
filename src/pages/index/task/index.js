import { useEffect } from 'react';

import * as taskApi from '@/apis/task'

import styles from './style.less'

function Task() {
  const [tasks, setTasks] = useEffect([]);

  useEffect(() => {
    taskApi.list().then(res => {
      setTasks(res.data)
    })
  }, [])

  return (
    <div className={styles.container}>
      task
    </div>
  );
}

export default Task;
