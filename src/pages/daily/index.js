import { useState, useEffect } from 'react';
import { CheckboxGroup, Checkbox } from '@douyinfe/semi-ui';
import * as dailyTaskApi from '@/apis/dailyTask';
import * as dailyDateApi from '@/apis/dailyDate';
import Head from '@/shared/components/Head';

import styles from './style.less';

function Daily() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    dailyTaskApi.list().then((res) => {
      setItems(res.data);
    });
  }, []);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    // 根据checkedValues的情况，更新数据库

    // 1. 创建任务 daily name username
    // 2. 创建一条任务日期 dailyDate name date username

    dailyDateApi.add({
      name: 'tg',
      date: '2024-01-19'
    });
  };

  const onAddTask = () => {
    dailyTaskApi.add({
      name: 'tg2'
    })
  }

  return (
    <div className={styles.container}>
      <Head />

      <CheckboxGroup
        style={{ width: '100%' }}
        onChange={onChange}
      >
        {items.map((item) => (
          <Checkbox
            key={item._id}
            value={item.name}
          >
            {item.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default Daily;
