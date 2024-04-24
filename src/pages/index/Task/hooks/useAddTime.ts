import { useState } from "react";
import { getToday } from "@/shared/utils";
import * as recordApi from "@/apis/record";
import openLoading from "@/components/Loading/mount";

const useAddTime = ({ tasks, onDone }) => {
  const [value, setValue] = useState(25);
  const [visible, setVisible] = useState(false);
  const [currTaskId, setCurrTaskId] = useState("");

  const onShowModal = (taskId) => {
    setCurrTaskId(taskId);
    setVisible(true);
  }

  const onCancel = () => {
    setVisible(false);
  };

  const setRecord = async (today, value, currTaskId) => {
    const currTask = tasks.find((task) => task._id === currTaskId);
    const close = openLoading();

    const res = await recordApi.list({
      name: currTask.name,
      date: today,
    });

    const records = res.data;

    if (records.length === 0) {
      await recordApi.add({
        date: today,
        name: currTask.name,
        value: value,
        target: currTask.target,
      });
    } else if (records.length === 1) {
      await recordApi.update({
        query: {
          date: today,
          name: currTask.name,
        },
        payload: {
          value: records[0].value + value,
        },
      });
    } else {
      throw new Error("查询到超过一条数据，无法定位到需要更新的数据");
    }

    close();
  };

  const onConfirm = async () => {
    const today = getToday();

    if (today && value && currTaskId) {
      await setRecord(today, value, currTaskId);
      onCancel();
      onDone && onDone();
    }
  };

  return {
    value,
    setValue,
    visible,
    setVisible,
    currTaskId,
    setCurrTaskId,
    onShowModal,
    onCancel,
    onConfirm,
  }
}

export default useAddTime