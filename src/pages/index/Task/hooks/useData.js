import { useState, useEffect } from "react";
import { getToday } from "@/shared/utils";
import * as taskApi from "@/apis/task";
import * as recordApi from "@/apis/record";

const useData = ({ timestamp }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTarget, setTaskTarget] = useState(5);

  // 获取tasks
  useEffect(() => {
    const fetchData = async () => {
      const today = getToday();

      setLoading(true);
      const res = await taskApi.list();
      const tasks = res.data ?? [];

      if (!tasks.length) {
        setLoading(false);
        return;
      }

      const pros = tasks.map((item) =>
        recordApi.list({
          date: today,
          name: item.name,
        })
      );
      Promise.all(pros).then((reses) => {
        const records = reses.flatMap((res) => res.data);
        // 往tasks里面塞了一个投入时间的字段value
        const nextTasks = tasks.map((task) => {
          const record = records.find((record) => task.name === record.name);
          return {
            ...task,
            value: record?.value ?? 0,
          };
        });

        setItems(nextTasks);
        setTasks(tasks);
        setLoading(false);
      });
    };
    fetchData();
  }, [timestamp]);

  return {
    loading,
    setLoading,
    tasks,
    setTasks,
    items,
    setItems,
    taskName,
    setTaskName,
    taskTarget,
    setTaskTarget,
  };
};

export default useData;
