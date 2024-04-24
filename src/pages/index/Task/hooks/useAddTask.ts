import { useState } from "react";
import * as taskApi from "@/apis/task";

const useAddTask = () => {
  const [visible, setVisible] = useState(false);

  const onAddTaskCancel = () => {
    setVisible(false);
  };

  const onAddTaskConfirm = async (taskName, taskTarget) => {
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

    onAddTaskCancel();
  };

  return {
    visible,
    setVisible,
    onAddTaskCancel,
    onAddTaskConfirm,
  };
};

export default useAddTask;
