import { useState } from "react";
import { Toast } from "@douyinfe/semi-ui";
import * as dailyDateApi from "@/apis/dailyDate";
import * as dailyTaskApi from "@/apis/dailyTask";
import { getToday } from "@/shared/utils";

const useUpdate = ({ onDone, onDonePosition }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskLink, setUpdateTaskLink] = useState("");
  const [updateTaskPeriod, setUpdateTaskPeriod] = useState("");
  const [updateTaskPosition, setUpdateTaskPosition] = useState();
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

  // TODO: 改成一个对象直接传进去
  const updateTask = async (id, name, link, period, position) => {
    await dailyTaskApi.update({ id, name, link, period, position });

    setCurrentTask(null);
    setUpdateTaskName("");
    setUpdateTaskLink("");
    setEditVisible(false);

    onDonePosition && onDonePosition({ id, name, link, period, position });
  };

  const onEdit = (target) => {
    setCurrentTask(target);
    setUpdateTaskName(target.name);
    setUpdateTaskLink(target.link);
    setUpdateTaskPeriod(target.period);
    setUpdateTaskPosition(target.position);
    setEditVisible(true);
  };

  const onUpdateTaskOk = () => {
    const { _id } = currentTask;

    if (
      updateTaskName === currentTask.name
      && updateTaskLink === currentTask.link
      && updateTaskPeriod === currentTask.period
      && updateTaskPosition === currentTask.position
    ) {
      Toast.error("未检测到修改");
      return;
    }

    updateTask(_id, updateTaskName, updateTaskLink, updateTaskPeriod, updateTaskPosition);

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
    updateTaskPeriod,
    setUpdateTaskPeriod,
    updateTaskPosition,
    setUpdateTaskPosition,
    currentTask,
    setCurrentTask,
    updateChecked,
    updateTask,
    onEdit,
    onUpdateTaskOk,
  };
};

export default useUpdate;
