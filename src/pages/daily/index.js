import { useState, useEffect } from 'react';
import { Input, Button, CheckboxGroup, Checkbox, Modal } from '@douyinfe/semi-ui';

import { getToday } from '@/shared/utils';
import * as dailyTaskApi from '@/apis/dailyTask';
import * as dailyDateApi from '@/apis/dailyDate';
import Head from '@/shared/components/Head';

import styles from './style.less';

const today = getToday();

function Daily() {
  const [taskNameModal, setTaskNameModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [items, setItems] = useState([]);
  const [dates, setDates] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    dailyTaskApi.list().then((res) => {
      setItems(res.data);
    });

    dailyDateApi
      .list({
        date: today,
      })
      .then((res) => {
        setDates(res.data);
      });
  }, []);

  useEffect(() => {
    async function update() {
      console.log('checkedValues')

      for (const name of checkedValues) {
        const res = await dailyDateApi.list({
          name: name,
          date: today,
        });

        if (res.data.length) {
          await dailyDateApi.del({
            id: res.data[0]._id
          })
        } else {
          await dailyDateApi.add({
            name: name,
            date: today,
          })
        }
      }
    }

    update();
  }, [checkedValues]);

  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues);
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

  console.log('dates', dates);

  return (
    <div className={styles.container}>
      <Head />
      <Button onClick={onAddTask}>创建打卡任务</Button>
      <CheckboxGroup
        style={{ width: '100%' }}
        value={checkedValues}
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
