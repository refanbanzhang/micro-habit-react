import { useRef, useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { Popconfirm, Card, Button, Modal, RadioGroup, Radio, Spin, Input } from '@douyinfe/semi-ui';
import { IconPlus, IconLoading, IconDelete } from '@douyinfe/semi-icons';
import { getToday, getPercent, getLevelClassNew } from '@/shared/utils';
import * as taskApi from '@/apis/task';
import * as recordApi from '@/apis/record';

import styles from './style.less';

function Task() {
  const today = getToday();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(5);
  const [currTaskId, setCurrTaskId] = useState('');
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskTarget, setTaskTarget] = useState(5);
  const [taskVisible, setTaskVisible] = useState(false);
  const inputRef = useRef(null);

  const init = useCallback(() => {
    taskApi.list().then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, []);

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
      init();
    }
  };

  const onAddTaskCancel = () => {
    setTaskVisible(false);
  };

  const onAddTaskConfirm = async () => {
    if (!taskName) {
      alert('请输入任务名称');
      return;
    }

    if (!taskTarget) {
      alert('请输入目标时间');
      return;
    }

    // 发起创建请求
    await taskApi.add({
      name: taskName,
      target: taskTarget,
    });

    init();
    onAddTaskCancel();
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    init();
  }, [init]);

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

  const onAddTask = () => {
    setTaskVisible(true);
  };
  
  useEffect(() => {
    if (taskVisible) {
      inputRef.current?.focus();
    }
  }, [taskVisible])

  const deleteTask = async (id) => {
    await taskApi.remove({
      id
    });
    init();
  };

  const onDeleteTask = (id) => {
    if (id) {
      deleteTask(id);
    }
  };

  if (loading) {
    return <Spin indicator={<IconLoading />} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.marginBottom}>
        <Button
          type="primary"
          onClick={onAddTask}
        >
          添加任务
        </Button>
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            className={classnames([
              styles.card,
              getLevelClassNew(item.value, item.target),
              {
                [styles.finished]: item.value >= item.target,
              },
            ])}
            style={{ maxWidth: '50%' }}
            headerExtraContent={
              <>
                <Button
                  style={{ marginRight: 10 }}
                  icon={<IconPlus />}
                  onClick={() => onShowModal(item._id)}
                />
                <Popconfirm
                  title="确定是否要保存此修改？"
                  content="此修改将不可逆"
                  onConfirm={() => onDeleteTask(item._id)}
                >
                  <Button icon={<IconDelete />} />
                </Popconfirm>
              </>
            }
          >
            <div>目标：{item.target}</div>
            <div>已完成：{item.value}</div>
            <div>进度：{getPercent(item.value, item.target)}</div>
          </Card>
        ))}
      </div>

      <Modal
        title="创建任务"
        visible={taskVisible}
        onCancel={onAddTaskCancel}
        footer={
          <Button
            type="primary"
            onClick={onAddTaskConfirm}
          >
            确定
          </Button>
        }
      >
        <div className={styles.box}>
          <div className={styles.label}>任务名：</div>
          <Input
            ref={inputRef}
            value={taskName}
            className={styles.input}
            onChange={setTaskName}
          />
          <div className={styles.label}>任务目标（分钟）：</div>
          <Input
            value={taskTarget}
            className={styles.input}
            onChange={setTaskTarget}
          />
        </div>
      </Modal>

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
