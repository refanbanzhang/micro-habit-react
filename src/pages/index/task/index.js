import { useState, useEffect } from 'react';
import { Card, Button, Modal, RadioGroup, Radio } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import classnames from 'classnames';

import { getToday, getPercent, getLevelClassNew } from '@/shared/utils';
import * as taskApi from '@/apis/task';
import * as recordApi from '@/apis/record';

import styles from './style.less';

function Task() {
  const today = getToday();
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(5);
  const [currTaskId, setCurrTaskId] = useState('');
  const [visible, setVisible] = useState(false);

  const onShowModal = (taskId) => {
    setCurrTaskId(taskId);
    setVisible(true);
  };

  const setRecord = async (today, value, currTaskId) => {
    const currTask = tasks.find((task) => task._id === currTaskId);
    const res = await recordApi.list({
      name: currTask.name,
      date: today,
    });

    const records = res.data;

    if (records.length === 0) {
      await recordApi.add({
        date: today,
        name: currTask.name,
        value: value,
        target: currTask.target,
      });
      return;
    }

    if (records.length === 1) {
      await recordApi.update({
        query: {
          date: today,
          name: currTask.name,
        },
        payload: {
          value: records[0].value + value,
        },
      });
      return;
    }

    throw new Error('查询到超过一条数据，无法定位到需要更新的数据');
  };

  const onConfirm = async () => {
    onCancel();

    if (today && value && currTaskId) {
      await setRecord(today, value, currTaskId);
      // 如何自动更新items呢？
      window.location.reload();
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

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
          className={classnames([styles.card, getLevelClassNew(item.value, item.target)])}
          style={{ maxWidth: '50%' }}
          headerExtraContent={<Button icon={<IconPlus onClick={() => onShowModal(item._id)} />} />}
        >
          <div>目标：{item.target}</div>
          <div>已完成：{item.value}</div>
          <div>进度：{getPercent(item.value, item.target)}</div>
        </Card>
      ))}

      <Modal
        title="请选择需要添加的时间："
        visible={visible}
        onCancel={onCancel}
        footer={
          <Button
            type="primary"
            onClick={onConfirm}
          >
            确定
          </Button>
        }
      >
        <div className={styles.radios}>
          <RadioGroup
            onChange={onChange}
            value={value}
          >
            <Radio value={5}>5分钟</Radio>
            <Radio value={10}>10分钟</Radio>
            <Radio value={15}>15分钟</Radio>
            <Radio value={25}>25分钟</Radio>
            <Radio value={50}>50分钟</Radio>
            <Radio value={100}>100分钟</Radio>
          </RadioGroup>
        </div>
      </Modal>
    </div>
  );
}

export default Task;
