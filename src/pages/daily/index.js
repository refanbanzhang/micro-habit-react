import { useRef, useState, useEffect } from 'react';
import { Input, Button, Checkbox, Modal, Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';

import { getToday } from '@/shared/utils';
import * as dailyTaskApi from '@/apis/dailyTask';
import * as dailyDateApi from '@/apis/dailyDate';
import Head from '@/shared/components/Head';

import styles from './style.less';

const today = getToday();

function Daily() {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [dates, setDates] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(true);
  const [taskNameModal, setTaskNameModal] = useState(false);

  useEffect(() => {
    if (taskNameModal) {
      inputRef.current.focus();
    }
  }, [taskNameModal]);

  useEffect(() => {
    const loadData = async () => {
      const res = await dailyDateApi.list();
      setDates(res.data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const taskRes = await dailyTaskApi.list();
      const dateRes = await dailyDateApi.list({
        date: today,
      });

      // 将dates中的数据，融合到tasks中，实现初始化选中
      const names = dateRes.data.map((item) => item.name);
      setTasks(
        taskRes.data.map((item) => ({
          ...item,
          checked: names.includes(item.name),
        })),
      );
      setLoading(false);
    };

    loadData();
  }, []);

  const update = async (name, checked) => {
    if (checked) {
      await dailyDateApi.del({
        name,
        date: today,
      });
    } else {
      await dailyDateApi.add({
        name,
        date: today,
      });
    }
  };

  const onChange = (e) => {
    const { value, checked } = e.target;

    update(value, !checked);
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
    window.location.reload();
  };

  const onDelTask = async (id) => {
    await dailyTaskApi.del({
      id,
    });
    window.location.reload();
  };

  /**
   * 获取任务的完成次数
   * @param {string} name
   * @param {Record[]} dates
   * @returns {boolean}
   */
  const getCount = (name, dates = []) => dates.filter((date) => date.name === name).length;

  return (
    <div className={styles.container}>
      <Head />
      <Button
        size="large"
        className={styles.addBtn}
        onClick={onAddTask}
      >
        创建打卡任务
      </Button>

      {loading ? (
        <Spin indicator={<IconLoading />} />
      ) : (
        tasks.map((item) => (
          <div
            className={styles.item}
            key={item._id}
          >
            <Checkbox
              key={item._id}
              value={item.name}
              defaultChecked={item.checked}
              onChange={onChange}
            >
              <span className={styles.name}>{item.name}</span> 已打卡天数：{getCount(item.name, dates)}
            </Checkbox>
            <Button
              size="small"
              className={styles.delBtn}
              onClick={() => onDelTask(item._id)}
            >
              删除
            </Button>
          </div>
        ))
      )}

      <Modal
        title="请输入任务名"
        visible={taskNameModal}
        onOk={onTaskNameModalOk}
        onCancel={onTaskNameModalCancel}
        closeOnEsc={true}
      >
        <Input
          ref={inputRef}
          value={taskName}
          onChange={setTaskName}
        ></Input>
      </Modal>
    </div>
  );
}

export default Daily;
