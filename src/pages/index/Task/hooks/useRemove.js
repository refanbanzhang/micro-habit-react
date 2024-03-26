import { useState } from "react";
import { Modal } from "@douyinfe/semi-ui";
import { isMobile } from "@/shared/utils";
import * as taskApi from "@/apis/task";

const useRemove = ({ onDone }) => {
  const [visible, setVisible] = useState(false);
  const [currentOperationTask, setCurrentOperationTask] = useState(null);
  const [confirmDeleteTaskName, setConfirmDeleteTaskName] = useState("");

  const onConfirmDeleteTaskConfirm = async () => {
    if (!confirmDeleteTaskName) {
      alert("请输入需要删除的任务名");
      return;
    }

    if (currentOperationTask.name !== confirmDeleteTaskName) {
      alert("任务名不一致，请确认");
      return;
    }

    await taskApi.remove({
      id: currentOperationTask._id,
    });

    setVisible(false);
    setConfirmDeleteTaskName("");
    setCurrentOperationTask(null);

    onDone && onDone();
  };

  const onDelete = (item) => {
    const size = isMobile() ? "full-width" : "small";
    const config = {
      size,
      title: "确定要删除吗？",
      content: "此操作将不可逆！",
      ...(isMobile() ? {} : { width: "90%" }),
      onOk: () => {
        setVisible(true);
        setCurrentOperationTask(item);
      },
    };
    Modal.error(config);
  };

  return {
    visible,
    setVisible,
    confirmDeleteTaskName,
    setConfirmDeleteTaskName,
    currentOperationTask,
    onConfirmDeleteTaskConfirm,
    onDelete,
  };
};

export default useRemove;
