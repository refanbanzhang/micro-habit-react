import { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Popconfirm, Card, Button, Modal, RadioGroup, Radio, Spin, Input } from '@douyinfe/semi-ui';
import { IconPlus, IconLoading, IconDelete } from '@douyinfe/semi-icons';
import { getToday, getPercent, getLevelClassNew, isMobile } from '@/shared/utils';
import * as taskApi from '@/apis/task';
import * as recordApi from '@/apis/record';
import openLoading from '@/shared/components/Loading/mount';
import useThemeContext from '@/shared/hooks/useThemeContext';

import styles from './style.less';

function Task(props) {
  const { timestamp, setTimestamp } = props;
  const today = getToday();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(25);
  const [currTaskId, setCurrTaskId] = useState('');
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskTarget, setTaskTarget] = useState(5);
  const [taskVisible, setTaskVisible] = useState(false);

  const confirmDeleteTaskNameInputRef = useRef(null);
  const [confirmDeleteTaskName, setConfirmDeleteTaskName] = useState('')
  const [confirmDeleteTaskVisible, setConfirmDeleteTaskVisible] = useState(false);
  const [currentOperationTask, setCurrentOperationTask] = useState(null)


  const inputRef = useRef(null);
  const themeContext = useThemeContext();

  const onShowModal = (taskId) => {
    setCurrTaskId(taskId);
    setVisible(true);
  };

  const setRecord = async (today, value, currTaskId) => {
    const currTask = tasks.find((task) => task._id === currTaskId);
    const close = openLoading();

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
    } else if (records.length === 1) {
      await recordApi.update({
        query: {
          date: today,
          name: currTask.name,
        },
        payload: {
          value: records[0].value + value,
        },
      });
    } else {
      throw new Error('查询到超过一条数据，无法定位到需要更新的数据');
    }

    close();

    setTimestamp(Date.now());
  };

  const onConfirm = async () => {
    if (today && value && currTaskId) {
      await setRecord(today, value, currTaskId);
      onCancel();
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

    setTimestamp(Date.now());

    onAddTaskCancel();
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onConfirmDeleteTaskConfirm = async () => {
    if (!confirmDeleteTaskName) {
      alert('请输入需要删除的任务名');
      return;
    }

    if (currentOperationTask.name !== confirmDeleteTaskName) {
      alert('任务名不一致，请确认');
      return;
    }

    await taskApi.remove({
      id: currentOperationTask._id,
    });
    setTimestamp(Date.now());
    setConfirmDeleteTaskVisible(false);
    setConfirmDeleteTaskName('')
    setCurrentOperationTask(null)
  }

  // 新增任务弹层，input自动focus
  useEffect(() => {
    if (taskVisible) {
      inputRef.current?.focus();
    }
  }, [taskVisible]);

  // 将记录合计到任务中
  useEffect(() => {
    if (!tasks.length) {
      setItems([]);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await taskApi.list();
      const data = res.data ?? [];
      setTasks(data);
      setLoading(false);
    };
    fetchData();
  }, [timestamp]);

  if (loading) {
    return <Spin indicator={<IconLoading />} />;
  }

  return (
    <div className={classnames([styles.container, styles[themeContext.state]])}>
      <div className={styles.marginBottom}>
        <Button
          type="primary"
          onClick={() => setTaskVisible(true)}
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
                  title="确定要删除吗？"
                  content="此操作将不可逆"
                  onConfirm={() => {
                    // 弹出一个输入框
                    setConfirmDeleteTaskVisible(true);
                    setCurrentOperationTask(item);
                  }}
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
        size={isMobile() ? 'full-width' : 'small'}
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
        title="删除确认"
        size={isMobile() ? 'full-width' : 'small'}
        visible={confirmDeleteTaskVisible}
        onCancel={() => setConfirmDeleteTaskVisible(false)}
        footer={
          <Button
            type="primary"
            onClick={onConfirmDeleteTaskConfirm}
          >
            确定
          </Button>
        }
      >
        <div className={styles.box}>
          <div className={styles.label}>请输入任务名：</div>
          <Input
            ref={confirmDeleteTaskNameInputRef}
            value={confirmDeleteTaskName}
            className={styles.input}
            onChange={(value) => setConfirmDeleteTaskName(value)}
          />
        </div>
      </Modal>

      <Modal
        title="请选择需要添加的时间："
        size={isMobile() ? 'full-width' : 'small'}
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
