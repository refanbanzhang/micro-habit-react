import { useState, useEffect } from "react";
import { Button, Modal, Skeleton } from "@douyinfe/semi-ui";
import { getToday, isMobile } from "@/shared/utils";
import * as taskApi from "@/apis/task";
import * as recordApi from "@/apis/record";
import openLoading from "@/shared/components/Loading/mount";
import useFocus from '@/shared/hooks/useFocus';

import ListItem from "./ListItem";
import CreateForm from './CreateForm';
import RemoveForm from './RemoveForm';
import AddTimeForm from './AddTimeForm';
import useRemove from './hooks/useRemove';

function Task(props) {
  const { timestamp, setTimestamp, taskVisible, setTaskVisible } = props;
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(25);
  const [currTaskId, setCurrTaskId] = useState("");
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskTarget, setTaskTarget] = useState(5);

  const {
    visible: confirmDeleteTaskVisible,
    setVisible: setConfirmDeleteTaskVisible,
    confirmDeleteTaskName,
    setConfirmDeleteTaskName,
    setCurrentOperationTask,
    onConfirmDeleteTaskConfirm,
  } = useRemove({
    onDone: () => {
      setTimestamp(Date.now());
    }
  });
  const size = isMobile() ? "full-width" : "small";
  const { ref: inputRef } = useFocus({ visible: taskVisible });
  const { ref: confirmDeleteTaskNameInputRef } = useFocus({ visible: confirmDeleteTaskVisible });

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
      throw new Error("查询到超过一条数据，无法定位到需要更新的数据");
    }

    close();

    setTimestamp(Date.now());
  };

  const onShowModal = (taskId) => {
    setCurrTaskId(taskId);
    setVisible(true);
  };

  const onConfirm = async () => {
    const today = getToday();

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
      alert("请输入任务名称");
      return;
    }

    if (!taskTarget) {
      alert("请输入目标时间");
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

  const onDelete = (item) => {
    const config = {
      size,
      title: "确定要删除吗？",
      content: "此操作将不可逆！",
      ...(isMobile() ? {} : { width: "90%" }),
      onOk: () => {
        setConfirmDeleteTaskVisible(true);
        setCurrentOperationTask(item);
      },
    };
    Modal.error(config);
  };

  // 获取tasks
  useEffect(() => {
    const fetchData = async () => {
      const today = getToday();

      setLoading(true);
      const res = await taskApi.list();
      const tasks = res.data ?? [];

      if (!tasks.length) {
        setLoading(false);
        return;
      }

      const pros = tasks.map((item) =>
        recordApi.list({
          date: today,
          name: item.name,
        })
      );
      Promise.all(pros).then((reses) => {
        const records = reses.flatMap((res) => res.data);
        // 往tasks里面塞了一个投入时间的字段value
        const nextTasks = tasks.map((task) => {
          const record = records.find((record) => task.name === record.name);
          return {
            ...task,
            value: record?.value ?? 0,
          };
        });

        setItems(nextTasks);
        setTasks(tasks);
        setLoading(false);
      });
    };
    fetchData();
  }, [timestamp]);

  const placeholder = (
    <Skeleton.Image style={{ height: 220 }} />
  );

  return (
    <>
      <Skeleton placeholder={placeholder} loading={loading} active>
        <div className="flex flex-col">
          {items.map((item) => (
            <ListItem
              key={item._id}
              item={item}
              onShowModal={onShowModal}
              onDelete={onDelete}
            />
          ))}
        </div>
      </Skeleton>

      <Modal
        title="创建任务"
        size={size}
        visible={taskVisible}
        onCancel={onAddTaskCancel}
        footer={
          <Button type="primary" onClick={onAddTaskConfirm}>
            确定
          </Button>
        }
      >
        <CreateForm
          inputRef={inputRef}
          taskName={taskName}
          setTaskName={setTaskName}
          taskTarget={taskTarget}
          setTaskTarget={setTaskTarget}
        />
      </Modal>

      <Modal
        title="删除确认"
        size={size}
        visible={confirmDeleteTaskVisible}
        onCancel={() => setConfirmDeleteTaskVisible(false)}
        footer={
          <Button type="primary" onClick={onConfirmDeleteTaskConfirm}>
            确定
          </Button>
        }
      >
        <RemoveForm
          confirmDeleteTaskNameInputRef={confirmDeleteTaskNameInputRef}
          confirmDeleteTaskName={confirmDeleteTaskName}
          setConfirmDeleteTaskName={setConfirmDeleteTaskName}
        />
      </Modal>

      <Modal
        title="请选择需要添加的时间："
        size={size}
        visible={visible}
        onCancel={onCancel}
        footer={
          <Button type="primary" onClick={onConfirm}>
            确定
          </Button>
        }
      >
        <AddTimeForm value={value} setValue={setValue} />
      </Modal>
    </>
  );
}

export default Task;
