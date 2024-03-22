import { useState } from "react";
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
  }

  return {
    visible,
    setVisible,
    confirmDeleteTaskName,
    setConfirmDeleteTaskName,
    currentOperationTask,
    setCurrentOperationTask,
    onConfirmDeleteTaskConfirm,
  }
}

export default useRemove