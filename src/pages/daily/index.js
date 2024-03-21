import { useRef, useState, useEffect } from "react";
import { Toast, Input, Modal, Skeleton, Dropdown } from "@douyinfe/semi-ui";
import { IconEmpty, IconToast } from "@douyinfe/semi-icons-lab";
import { getToday, isMobile } from "@/shared/utils";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import Head from "@/shared/components/Head";
import { IconDescriptions, IconOverflow } from "@douyinfe/semi-icons-lab";
import openLoading from "@/shared/components/Loading/mount";
import Fixed from "@/shared/components/Fixed";

import ListItem from "./ListItem";
import placeholder from "./Placeholder";

const today = getToday();

function Daily() {
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [visibleFinished, setVisibleFinished] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);

  // 新增表单字段
  const [taskName, setTaskName] = useState("");
  const [taskLink, setTaskLink] = useState("");

  // 编辑表单字段
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskLink, setUpdateTaskLink] = useState("");

  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const update = async ({ name, checked }) => {
    if (!checked) {
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
    const nextTasks = tasks.map(item => ({
      ...item,
      checked: item.name === name ? checked : item.checked
    }))
    // 更新前端，不请求后端数据
    setTasks(nextTasks);
  };

  const onChange = async (query) => {
    const close = openLoading();
    await update(query);
    close()
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

  const onRemove = (id) => {
    Modal.error({
      title: "确认删除吗？",
      content: "该操作将不可逆！",
      async onOk() {
        await dailyTaskApi.del({
          id,
        });
        setTimestamp(Date.now());
      },
    });
  };

  const onEdit = (target) => {
    setCurrentTask(target);

    setUpdateTaskName(target.name);
    setUpdateTaskLink(target.link);

    setEditVisible(true);
  };

  const updateTask = async (id, name, link) => {
    await dailyTaskApi.update({ id, name, link });

    setEditVisible(false);
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

  // input focus
  useEffect(() => {
    visible && inputRef.current?.focus();
    editVisible && editInputRef.current?.focus();
  }, [visible, editVisible]);

  // get punch-in data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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

  const size = isMobile() ? "full-width" : "small";
  const textClassName = 'flex flex-col justify-center items-center text-[14px] h-[200px] text-[#999]';

  const renderPipe = (next) => {
    if (!tasks.length) {
      return <div className={textClassName}>
        <IconEmpty style={{ fontSize: 50, marginBottom: 20 }} />
        <div>暂无数据</div>
      </div>;
    }

    if (finishedTasks.length && !unfinishedTasks.length) {
      return (
        <div className={textClassName}>
          <IconToast style={{ fontSize: 50, marginBottom: 20 }} />
          <div>恭喜你，今天所有的任务都完成了！</div>
        </div>
      );
    }

    return next();
  };

  return (
    <div className="flex flex-col">
      <div className="mb-[15px]">
        <Fixed>
          <Head />
        </Fixed>
      </div>
      <div className="px-[15px]">
        <div className="pb-[5px]">
          <div className="flex items-center justify-between mb-[15px] font-bold">
            <div className="flex items-center">
              <IconDescriptions className="mr-[5px]" />
              <span className="text-[14px]">待完成</span>
            </div>
            <Dropdown
              clickToHide
              trigger="click"
              render={
                <Dropdown.Menu>
                  {
                    tasks.length > 0 && (<Dropdown.Item
                      onClick={() => setVisibleFinished((_state) => !_state)}
                    >
                      {visibleFinished ? "隐藏" : "显示"}已完成
                    </Dropdown.Item>)
                  }
                  <Dropdown.Item onClick={() => setVisible(true)}>
                    添加打卡
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <IconOverflow className="ml-[5px]" />
            </Dropdown>
          </div>
          <Skeleton placeholder={placeholder} loading={loading} active>
            {renderPipe(() =>
              unfinishedTasks.map((item) => (
                <ListItem
                  key={item._id}
                  item={item}
                  onEdit={() => onEdit(item)}
                  onChange={(e) => onChange({
                    name: item.name,
                    checked: e.target.checked,
                  })}
                  onRemove={() => onRemove(item._id)}
                />
              ))
            )}
          </Skeleton>
        </div>

        <div style={{ marginBottom: 25 }}>
          <div
            className="flex items-center mb-[15px] font-bold"
            style={{
              display: visibleFinished ? "flex" : "none",
            }}
          >
            <IconDescriptions className="mr-[5px]" />
            <span className="text-[14px]">已完成</span>
          </div>
          <div
            style={{
              display: visibleFinished ? "block" : "none",
            }}
          >
            {finishedTasks.map((item) => (
              <ListItem
                key={item._id}
                item={item}
                onEdit={onEdit}
                onChange={(e) => onChange({
                  name: item.name,
                  checked: e.target.checked,
                })}
                onRemove={() => onRemove(item._id)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        title="请输入任务名"
        size={size}
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
        size={size}
        visible={editVisible}
        onOk={onUpdateTaskOk}
        onCancel={() => setEditVisible(false)}
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
