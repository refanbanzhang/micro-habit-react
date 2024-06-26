import { useState } from "react";
import { Toast } from "@douyinfe/semi-ui";
import * as dailyTaskApi from "@/apis/dailyTask";

const useAdd = ({ onDone }) => {
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskPeriod, setTaskPeriod] = useState("day");

  const onCancel = () => {
    setVisible(false);
    setTaskName("");
  };

  const onOk = async () => {
    if (!taskName) {
      Toast.error("请输入打卡名");
      return;
    }

    await dailyTaskApi.add({
      name: taskName,
      link: taskLink,
      period: taskPeriod
    });

    onCancel();
    onDone && onDone();
  };

  return {
    visible,
    setVisible,
    taskName,
    setTaskName,
    taskLink,
    setTaskLink,
    taskPeriod,
    setTaskPeriod,
    onCancel,
    onOk,
  };
};

export default useAdd;
