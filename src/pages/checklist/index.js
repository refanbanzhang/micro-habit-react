import { useState } from "react";
import { flushSync } from "react-dom";
import { Input, Modal, Skeleton, Dropdown, Select } from "@douyinfe/semi-ui";
import { isMobile } from "@/shared/utils";
import Head from "@/components/Head";
import { IconDescriptions, IconOverflow } from "@douyinfe/semi-icons-lab";
import Fixed from "@/components/Fixed";
import useFocus from "@/hooks/useFocus";
import IF from "@/components/IF";

import "./style.css";
import ListItem from "./components/ListItem";
import placeholder from "./components/Placeholder";
import useAdd from "./hooks/useAdd";
import useData from "./hooks/useData";
import useUpdate from "./hooks/useUpdate";
import Tips from "./components/Tips";

function Daily() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [visibleFinished, setVisibleFinished] = useState(false);

  const onDone = () => {
    setTimestamp(Date.now());
  };

  const { loading, tasks, setTasks, onRemove } = useData({
    timestamp,
    onDone,
  });
  const {
    visible,
    setVisible,
    taskName,
    setTaskName,
    taskLink,
    setTaskLink,
    taskPeriod,
    setTaskPeriod,
    onCancel: onTaskNameModalCancel,
    onOk: onTaskNameModalOk,
  } = useAdd({
    onDone,
  });
  const {
    editVisible,
    setEditVisible,
    updateTaskName,
    setUpdateTaskName,
    updateTaskLink,
    setUpdateTaskLink,
    updateChecked,
    onEdit,
    onUpdateTaskOk,
  } = useUpdate({
    onDone({ name, checked }) {
      const nextTasks = tasks.map((item) => ({
        ...item,
        checked: item.name === name ? checked : item.checked,
      }));

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => {
            setTasks(nextTasks);
          });
        });
      } else {
        setTasks(nextTasks);
      }
    },
  });

  const { ref: inputRef } = useFocus({ visible });
  const { ref: editInputRef } = useFocus({ visible: editVisible });

  const onChange = async (query) => {
    await updateChecked(query);
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

  const size = isMobile() ? "full-width" : "small";

  const renderPipe = (next) => {
    if (!tasks.length) {
      return <Tips type="IconEmpty">暂无数据</Tips>;
    }

    if (finishedTasks.length && !unfinishedTasks.length) {
      return <Tips type="IconToast">恭喜你，今天所有的任务都完成了！</Tips>;
    }

    return next();
  };

  const renderItem = (item) => (
    <ListItem
      key={item._id}
      item={item}
      onEdit={() => onEdit(item)}
      onChange={(e) =>
        onChange({
          name: item.name,
          checked: e.target.checked,
        })
      }
      onRemove={() => onRemove(item._id)}
    />
  );

  return (
    <div className="flex flex-col">
      <div className="mb-[15px]">
        <Fixed>
          <Head />
        </Fixed>
      </div>
      <div className="px-[15px]">
        <div className="mb-[15px]">
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
                  {tasks.length > 0 && (
                    <Dropdown.Item
                      onClick={() => setVisibleFinished((_state) => !_state)}
                    >
                      {visibleFinished ? "隐藏" : "显示"}已完成
                    </Dropdown.Item>
                  )}
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
            {renderPipe(() => unfinishedTasks.map(renderItem))}
          </Skeleton>
        </div>

        <IF value={visibleFinished}>
          <div className="mb-[15px]">
            <div className="flex items-center justify-between mb-[15px] font-bold">
              <div className="flex items-center">
                <IconDescriptions className="mr-[5px]" />
                <span className="text-[14px]">已完成</span>
              </div>
            </div>
            {finishedTasks.map(renderItem)}
          </div>
        </IF>
      </div>

      <Modal
        title="请输入任务名"
        size={size}
        visible={visible}
        onOk={onTaskNameModalOk}
        onCancel={onTaskNameModalCancel}
        closeOnEsc={true}
      >
        <Input ref={inputRef} value={taskName} onChange={setTaskName} />
        <Input className="mt-[20px]" value={taskLink} onChange={setTaskLink} />
        <Select className="mt-[20px]" value={taskPeriod}  onChange={setTaskPeriod} style={{ width: '100%' }}>
            <Select.Option value="day">日检查项</Select.Option>
            <Select.Option value="week">周检查项</Select.Option>
            <Select.Option value="month">月检查项</Select.Option>
        </Select>
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
          className="mt-[20px]"
          value={updateTaskLink}
          onChange={setUpdateTaskLink}
        />
      </Modal>
    </div>
  );
}

export default Daily;
