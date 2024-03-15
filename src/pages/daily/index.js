import { useRef, useState, useEffect } from "react";
import { Toast, Input, Button, Modal, Skeleton } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { getToday, isMobile } from "@/shared/utils";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import Head from "@/shared/components/Head";
import useThemeContext from "@/shared/hooks/useThemeContext";

import styles from "./style.less";
import ListItem from "./ListItem";

const today = getToday();

function Daily() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [dates, setDates] = useState([]);
  const [visibleFinished, setVisibleFinished] = useState(false);
  const [isEditing, setIsEdting] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [editTaskModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  // 新增表单字段
  const [taskName, setTaskName] = useState("");
  const [taskLink, setTaskLink] = useState("");
  // 编辑表单字段
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskLink, setUpdateTaskLink] = useState("");
  // update
  const editInputRef = useRef(null);

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
        }))
      );
      setLoading(false);
    };

    fetchData();
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
    setTimestamp(Date.now());
  };

  const onChange = (e) => {
    const { value, checked } = e.target;

    update(value, !checked);
  };

  const onAddTask = () => {
    setVisible(true);
  };

  const onTaskNameModalOk = async () => {
    if (!taskName) {
      Toast.error("请输入打卡名");
      inputRef.current?.focus();
      return;
    }

    await dailyTaskApi.add({
      name: taskName,
      link: taskLink,
    });
    setTimestamp(Date.now());
    onTaskNameModalCancel();
  };

  const onTaskNameModalCancel = () => {
    setVisible(false);
    setTaskName("");
  };

  const onDelTask = async (id) => {
    await dailyTaskApi.del({
      id,
    });
    setTimestamp(Date.now());
  };

  const onEdit = (target) => {
    setCurrentTask(target);

    setUpdateTaskName(target.name);
    setUpdateTaskLink(target.link);

    setEditModalVisible(true);
  };

  const updateTask = async (id, name, link) => {
    await dailyTaskApi.update({ id, name, link });

    setEditModalVisible(false);
    setCurrentTask(null);
    setUpdateTaskName("");
    setTimestamp(Date.now());
  };

  const onUpdateTaskOk = () => {
    const { _id } = currentTask;

    if (
      updateTaskName === currentTask.name &&
      updateTaskLink === currentTask.link
    ) {
      Toast.error("未检测到修改");
      return;
    }

    updateTask(_id, updateTaskName, updateTaskLink);

    // cleanup
    setUpdateTaskName("");
    setUpdateTaskLink("");
  };

  const { unfinishedTasks, finishedTasks } = tasks.reduce(
    (acc, task) => {
      if (task.checked) {
        acc.finishedTasks.push(task);
      } else {
        acc.unfinishedTasks.push(task);
      }
      return acc;
    },
    { unfinishedTasks: [], finishedTasks: [] }
  );

  const placeholder = (
    <div>
      <Skeleton.Button
        style={{ width: "100%", height: 42, marginBottom: 10 }}
      />
      <Skeleton.Button
        style={{ width: "100%", height: 42, marginBottom: 10 }}
      />
      <Skeleton.Button
        style={{ width: "100%", height: 42, marginBottom: 10 }}
      />
      <Skeleton.Button
        style={{ width: "100%", height: 42, marginBottom: 10 }}
      />
    </div>
  );

  return (
    <div className={classNames([styles.container, styles[themeContext.state]])}>
      <Head />
      <div style={{ textAlign: "right" }}>
        <Button
          size="small"
          style={{ marginRight: 10 }}
          className={styles.addBtn}
          onClick={onAddTask}
        >
          创建打卡任务
        </Button>
        <Button
          size="small"
          style={{ marginRight: 10 }}
          className={styles.addBtn}
          onClick={() => setVisibleFinished((_state) => !_state)}
        >
          显示已完成
        </Button>
        <Button
          size="small"
          className={styles.addBtn}
          onClick={() => setIsEdting((_state) => !_state)}
        >
          编辑
        </Button>
      </div>

      <div className={styles.title} style={{ marginBottom: 10 }}>
        待完成
      </div>
      <Skeleton placeholder={placeholder} loading={loading} active>
        {unfinishedTasks.map((item) => (
          <ListItem
            key={item._id}
            item={item}
            dates={dates}
            isEditing={isEditing}
            onEdit={onEdit}
            onChange={onChange}
            onDelTask={onDelTask}
          />
        ))}
      </Skeleton>

      <div
        className={styles.title}
        style={{
          marginBottom: 10,
          display: visibleFinished ? "block" : "none",
        }}
      >
        已完成
      </div>
      {finishedTasks.map((item) => (
        <ListItem
          key={item._id}
          item={item}
          dates={dates}
          isEditing={isEditing}
          onEdit={onEdit}
          onChange={onChange}
          onDelTask={onDelTask}
        />
      ))}

      <Modal
        title="请输入任务名"
        size={isMobile() ? "full-width" : "small"}
        visible={visible}
        onOk={onTaskNameModalOk}
        onCancel={onTaskNameModalCancel}
        closeOnEsc={true}
      >
        <Input ref={inputRef} value={taskName} onChange={setTaskName}></Input>
        <Input
          style={{ marginTop: 20 }}
          value={taskLink}
          onChange={setTaskLink}
        ></Input>
      </Modal>

      <Modal
        title="修改任务名"
        size={isMobile() ? "full-width" : "small"}
        visible={editTaskModalVisible}
        onOk={onUpdateTaskOk}
        onCancel={() => setEditModalVisible(false)}
        closeOnEsc={true}
      >
        <Input
          ref={editInputRef}
          value={updateTaskName}
          onChange={setUpdateTaskName}
        />
        <Input
          style={{ marginTop: 20 }}
          value={updateTaskLink}
          onChange={setUpdateTaskLink}
        />
      </Modal>
    </div>
  );
}

export default Daily;
