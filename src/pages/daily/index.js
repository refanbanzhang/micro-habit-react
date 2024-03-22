import { useState } from "react";
import { Input, Modal, Skeleton, Dropdown } from "@douyinfe/semi-ui";
import { IconEmpty, IconToast } from "@douyinfe/semi-icons-lab";
import { isMobile } from "@/shared/utils";
import Head from "@/shared/components/Head";
import { IconDescriptions, IconOverflow } from "@douyinfe/semi-icons-lab";
import openLoading from "@/shared/components/Loading/mount";
import Fixed from "@/shared/components/Fixed";
import useFocus from "@/shared/hooks/useFocus";

import ListItem from "./ListItem";
import placeholder from "./Placeholder";
import useAdd from "./useAdd";
import useData from "./useData";
import useUpdate from "./useUpdate";

function Daily() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [visibleFinished, setVisibleFinished] = useState(false);

  const { loading, tasks, setTasks, onRemove } = useData({
    timestamp,
    onDone() {
      setTimestamp(Date.now());
    },
  });
  const {
    visible,
    setVisible,
    taskName,
    setTaskName,
    taskLink,
    setTaskLink,
    onCancel: onTaskNameModalCancel,
    onOk: onTaskNameModalOk,
  } = useAdd({
    onDone() {
      setTimestamp(Date.now());
    },
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
      // 更新前端，不请求后端数据
      setTasks(nextTasks);
    },
  });

  const { ref: inputRef } = useFocus({ visible });
  const { ref: editInputRef } = useFocus({ visible: editVisible });

  const onChange = async (query) => {
    const close = openLoading();
    await updateChecked(query);
    close();
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
  const textClassName =
    "flex flex-col justify-center items-center text-[14px] h-[200px] text-[#999]";

  const renderPipe = (next) => {
    if (!tasks.length) {
      return (
        <div className={textClassName}>
          <IconEmpty
            className="text-[50px] mb-[20px]"
            style={{ fontSize: 50 }}
          />
          <div>暂无数据</div>
        </div>
      );
    }

    if (finishedTasks.length && !unfinishedTasks.length) {
      return (
        <div className={textClassName}>
          <IconToast className="mb-[20px]" style={{ fontSize: 50 }} />
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
            {renderPipe(() =>
              unfinishedTasks.map((item) => (
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
              ))
            )}
          </Skeleton>
        </div>

        <div className="mb-[25px]">
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
                onEdit={() => onEdit(item)}
                onChange={(e) =>
                  onChange({
                    name: item.name,
                    checked: e.target.checked,
                  })
                }
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
        <Input ref={inputRef} value={taskName} onChange={setTaskName} />
        <Input className="mt-[20px]" value={taskLink} onChange={setTaskLink} />
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
