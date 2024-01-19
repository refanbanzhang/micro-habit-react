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
    // 1. 收集任务名

    // 2. 创建一条任务日期name date
    dailyDateApi.add({
      name: 'tg',
      date: '2024-01-19'
    });
  };

  const onAddTask = () => {
    // 1. 收集任务名称

    // 2. 创建任务name
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
