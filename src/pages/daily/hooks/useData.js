import { useState, useEffect } from "react";
import { Modal } from "@douyinfe/semi-ui";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import { getToday } from "@/shared/utils";

const useAdd = ({ timestamp, onDone }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const onRemove = (id) => {
    Modal.error({
      title: "确认删除吗？",
      content: "该操作将不可逆！",
      async onOk() {
        await dailyTaskApi.del({
          id,
        });

        onDone && onDone();
      },
    });
  };

  // get punch-in data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const today = getToday();
      const taskRes = await dailyTaskApi.list();
      const dateRes = await dailyDateApi.list({
        date: today,
      });

      // 将dates中的数据，融合到tasks中，实现初始化选中
      const names = dateRes.data.map((item) => item.name);
      setTasks(
        taskRes.data.map((item) => ({
          ...item,
          checked: names.includes(item.name),
        }))
      );

      setLoading(false);
    };

    fetchData();
  }, [timestamp]);

  return {
    loading,
    setLoading,
    tasks,
    setTasks,
    onRemove,
  };
};

export default useAdd;
