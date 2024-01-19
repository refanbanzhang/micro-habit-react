import { useState, useEffect } from 'react';
import { Input, Button, CheckboxGroup, Checkbox, Modal } from '@douyinfe/semi-ui';
import * as dailyTaskApi from '@/apis/dailyTask';
import * as dailyDateApi from '@/apis/dailyDate';
import Head from '@/shared/components/Head';

import styles from './style.less';

function Daily() {
  const [taskNameModal, setTaskNameModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    dailyTaskApi.list().then((res) => {
      setItems(res.data);
    });
  }, []);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    // 1. 收集任务名（checkedValues里面就是任务名）

    // 2. 创建一条任务日期name date
    dailyDateApi.add({
      name: 'tg',
      date: '2024-01-19',
    });
  };

  const onAddTask = () => {
    setTaskNameModal(true);
  };

  const onTaskNameModalOk = async () => {
    await dailyTaskApi.add({
      name: taskName,
    });
    onTaskNameModalCancel();
  };

  const onTaskNameModalCancel = () => {
    setTaskNameModal(false);
  };

  return (
    <div className={styles.container}>
      <Head />
      <Button onClick={onAddTask}>创建打卡任务</Button>
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

      <Modal
        title="请输入任务名"
        visible={taskNameModal}
        onOk={onTaskNameModalOk}
        onCancel={onTaskNameModalCancel}
        closeOnEsc={true}
      >
        <Input
          value={taskName}
          onChange={setTaskName}
        ></Input>
      </Modal>
    </div>
  );
}

export default Daily;
