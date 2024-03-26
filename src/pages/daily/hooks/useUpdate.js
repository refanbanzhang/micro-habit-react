import { useState } from "react";
import { Toast } from "@douyinfe/semi-ui";
import * as dailyDateApi from "@/apis/dailyDate";
import * as dailyTaskApi from "@/apis/dailyTask";
import { getToday } from "@/shared/utils";

const useUpdate = ({ onDone }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskLink, setUpdateTaskLink] = useState("");
  const [currentTask, setCurrentTask] = useState(null);

  const updateChecked = async ({ name, checked }) => {
    const today = getToday();

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

    onDone &&
      onDone({
        name,
        checked,
      });
  };

  const updateTask = async (id, name, link) => {
    await dailyTaskApi.update({ id, name, link });

    setCurrentTask(null);
    setUpdateTaskName("");
    setUpdateTaskLink("");
    setEditVisible(false);

    onDone && onDone();
  };

  const onEdit = (target) => {
    setCurrentTask(target);
    setUpdateTaskName(target.name);
    setUpdateTaskLink(target.link);
    setEditVisible(true);
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

  return {
    editVisible,
    setEditVisible,
    updateTaskName,
    setUpdateTaskName,
    updateTaskLink,
    setUpdateTaskLink,
    currentTask,
    setCurrentTask,
    updateChecked,
    updateTask,
    onEdit,
    onUpdateTaskOk,
  };
};

export default useUpdate;
