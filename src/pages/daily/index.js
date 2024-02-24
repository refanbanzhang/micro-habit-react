import { useRef, useState, useEffect } from 'react';
import { Toast, Input, Button, Checkbox, Modal, Spin, Popconfirm } from '@douyinfe/semi-ui';
import { IconLoading, IconDelete, IconEdit } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import { getToday, isMobile } from '@/shared/utils';
import * as dailyTaskApi from '@/apis/dailyTask';
import * as dailyDateApi from '@/apis/dailyDate';
import Head from '@/shared/components/Head';
import useThemeContext from '@/shared/hooks/useThemeContext';

import styles from './style.less';

const today = getToday();

/**
 * 获取任务的完成次数
 * @param {string} name
 * @param {Record[]} dates
 * @returns {boolean}
 */
const getCount = (name, dates = []) => dates.filter((date) => date.name === name).length;

function Daily() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [dates, setDates] = useState([]);

  // update
  const editInputRef = useRef(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [editTaskModalVisible, setEditModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const [loading, setLoading] = useState(true);
  const [taskName, setTaskName] = useState('');
  const [visible, setVisible] = useState(false);
  const themeContext = useThemeContext();

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
    if (editTaskModalVisible) {
      editInputRef.current?.focus();
    }

  }, [visible, editTaskModalVisible]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dailyDateApi.list();
      setDates(res.data);
    };

    fetchData();
  }, [timestamp]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData()
  }, [timestamp]);

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
    setTimestamp(Date.now())
  };

  const onChange = (e) => {
    const { value, checked } = e.target;

    update(value, !checked);
  };

  const onAddTask = () => {
    setVisible(true);
  };

  const onTaskNameModalOk = async () => {
    await dailyTaskApi.add({
      name: taskName,
    });
    setTimestamp(Date.now())
    onTaskNameModalCancel();
  };

  const onTaskNameModalCancel = () => {
    setVisible(false);
    setTaskName('');
  };

  const onDelTask = async (id) => {
    await dailyTaskApi.del({
      id,
    });
    setTimestamp(Date.now())
  };

  const onEdit = (target) => {
    setCurrentTask(target)
    setNewTaskName(target.name)
    setEditModalVisible(true)
  }

  const updateTask = async (id, name) => {
    await dailyTaskApi.update({ id, name })

    setEditModalVisible(false);
    setCurrentTask(null);
    setNewTaskName('');
    setTimestamp(Date.now())
  }

  const onUpdateTaskOk = () => {
    const { _id } = currentTask;

    if (newTaskName === currentTask.name) {
      Toast.error('未检测到修改');
      return;
    }

    updateTask(_id, newTaskName);
  }

  return (
    <div className={classNames([styles.container, styles[themeContext.state]])}>
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
            <div>
              <Popconfirm
                title="确认"
                content="要删除该条记录吗？"
                onConfirm={() => onDelTask(item._id)}
              >
                <IconDelete className={styles.delBtn} />
              </Popconfirm>
              <IconEdit className={styles.delBtn} onClick={() => onEdit(item)} />
            </div>
          </div>
        ))
      )}

      <Modal
        title="请输入任务名"
        size={isMobile() ? 'full-width' : 'small'}
        visible={visible}
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

      <Modal
        title="修改任务名"
        size={isMobile() ? 'full-width' : 'small'}
        visible={editTaskModalVisible}
        onOk={onUpdateTaskOk}
        onCancel={() => setEditModalVisible(false)}
        closeOnEsc={true}
      >
        <Input
          ref={editInputRef}
          value={newTaskName}
          onChange={setNewTaskName}
        ></Input>
      </Modal>
    </div>
  );
}

export default Daily;
