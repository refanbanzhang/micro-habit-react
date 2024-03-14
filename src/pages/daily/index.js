import { useRef, useState, useEffect } from "react";
import {
  Toast,
  Input,
  Button,
  Checkbox,
  Modal,
  Spin,
  Popconfirm,
} from "@douyinfe/semi-ui";
import {
  IconLoading,
  IconDelete,
  IconEdit,
  IconLink,
} from "@douyinfe/semi-icons";
import classNames from "classnames";
import { getToday, isMobile } from "@/shared/utils";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import Head from "@/shared/components/head";
import useThemeContext from "@/shared/hooks/useThemeContext";

import styles from "./style.less";

const today = getToday();

/**
 * 获取任务的完成次数
 * @param {string} name
 * @param {Record[]} dates
 * @returns {boolean}
 */
const getCount = (name, dates = []) =>
  dates.filter((date) => date.name === name).length;

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

  const renderItem = (item) => (
    <div className={styles.item} key={item._id}>
      <Checkbox
        key={item._id}
        value={item.name}
        style={{ marginTop: 2 }}
        defaultChecked={item.checked}
        onChange={onChange}
      />
      <div className={styles.main}>
        <span className={styles.name}>{item.name}</span>
        <span style={{ display: "none" }}>
          已打卡天数：{getCount(item.name, dates)}
        </span>
        <div className={styles.fixedRight}>
          <Popconfirm
            title="确认"
            content="要删除该条记录吗？"
            onConfirm={() => onDelTask(item._id)}
          >
            <IconDelete
              style={{
                display: isEditing ? "block" : "none",
              }}
              className={styles.btn}
            />
          </Popconfirm>
          <IconEdit
            style={{
              display: isEditing ? "block" : "none",
            }}
            className={styles.btn}
            onClick={() => onEdit(item)}
          />
          {item.link && (
            <IconLink
              className={styles.btn}
              onClick={() => window.open(item.link)}
            />
          )}
        </div>
      </div>
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

      {loading ? (
        <Spin indicator={<IconLoading />} />
      ) : (
        <>
          <div className={styles.title} style={{ marginBottom: 10 }}>
            待完成
          </div>
          {unfinishedTasks.map(renderItem)}
          <div style={{ display: visibleFinished ? "block" : "none" }}>
            <div className={styles.title} style={{ marginBottom: 10 }}>
              已完成
            </div>
            {finishedTasks.map(renderItem)}
          </div>
        </>
      )}

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
