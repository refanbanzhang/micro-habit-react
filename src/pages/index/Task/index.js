import { Button, Modal, Skeleton } from "@douyinfe/semi-ui";
import { isMobile } from "@/shared/utils";
import useFocus from "@/shared/hooks/useFocus";

import ListItem from "./ListItem";
import CreateForm from "./CreateForm";
import RemoveForm from "./RemoveForm";
import AddTimeForm from "./AddTimeForm";
import useData from "./hooks/useData";
import useRemove from "./hooks/useRemove";
import useAddTime from "./hooks/useAddTime";

function Task(props) {
  const { timestamp, setTimestamp, taskVisible, onAddTaskCancel, onAddTaskConfirm } = props;

  const {
    loading,
    tasks,
    items,
    taskName,
    setTaskName,
    taskTarget,
    setTaskTarget,
  } = useData({
    timestamp,
  });

  const { value, setValue, visible, onShowModal, onCancel, onConfirm } =
    useAddTime({
      tasks,
      onDone: () => {
        setTimestamp(Date.now());
      },
    });

  const {
    visible: confirmDeleteTaskVisible,
    setVisible: setConfirmDeleteTaskVisible,
    confirmDeleteTaskName,
    setConfirmDeleteTaskName,
    onConfirmDeleteTaskConfirm,
    onDelete,
  } = useRemove({
    onDone: () => {
      setTimestamp(Date.now());
    },
  });
  const size = isMobile() ? "full-width" : "small";
  const { ref: inputRef } = useFocus({ visible: taskVisible });
  const { ref: confirmDeleteTaskNameInputRef } = useFocus({
    visible: confirmDeleteTaskVisible,
  });

  const placeholder = <>
    <Skeleton.Image style={{ height: 112, marginBottom: 15 }} />
    <Skeleton.Image style={{ height: 112 }} />
  </>;

  return (
    <>
      <Skeleton placeholder={placeholder} loading={loading} active>
        <div className="flex flex-col">
          {items.map((item) => (
            <ListItem
              key={item._id}
              item={item}
              onShowModal={() => onShowModal(item._id)}
              onDelete={() => onDelete(item)}
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
          <Button type="primary" onClick={async () => {
            await onAddTaskConfirm(taskName, taskTarget);
            setTimestamp(Date.now());
          }}>
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
