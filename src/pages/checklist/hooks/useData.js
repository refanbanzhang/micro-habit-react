import { useState, useEffect } from "react";
import { Modal } from "@douyinfe/semi-ui";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import { getToday } from "@/shared/utils";

const getDatesByDate = (handler) => {
  // 使用处理函数计算开始日期和结束日期
  const [startDate, endDate] = handler();
  const length = endDate.getDate() - startDate.getDate() + 1;
  return Array.from({ length }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index + 1);
    return date.toISOString().split("T")[0];
  });
};

/**
 * 根据给定的日期返回那一周的所有日期
 * @param {string} date - 格式为 'YYYY-MM-DD'
 * @returns {string[]} - 那一周的日期数组
 */
export const getWeekDatesByDate = (dateString) =>
  getDatesByDate(() => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return [startDate, endDate];
  });

/**
 * 根据给定的日期返回那个月的所有日期
 * @param {string} date - 格式为 'YYYY-MM-DD'
 * @returns {string[]} - 那个月的日期数组
 */
export const getMonthDatesByDate = (dateString) =>
  getDatesByDate(() => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return [startDate, endDate];
  });

const filterTaskByType = async (tasks, type) => {
  const today = getToday();
  const dates =
    type === "week" ? getWeekDatesByDate(today) : getMonthDatesByDate(today);
  const monthTask = tasks.filter((item) => item.period === type);
  const monthPros = monthTask.map(async (task) => {
    const res = await dailyDateApi.list({
      name: task.name,
      dates,
    });
    return {
      name: task.name,
      checked: res.data.length,
    };
  });
  const monthDateResItems = await Promise.all(monthPros);
  const checkedMonthTaskNameItems = monthDateResItems
    .filter((item) => item.checked)
    .map((item) => item.name);
  return tasks.filter((task) => !checkedMonthTaskNameItems.includes(task.name));
};

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

  // get checklist data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const taskRes = await dailyTaskApi.list();
      const dateRes = await dailyDateApi.list({
        dates: [getToday()],
      });
      const nextTasks = await filterTaskByType(taskRes.data, "week").then(
        (data) => filterTaskByType(data, "month")
      );

      // 将dates中的数据，融合到tasks中，实现初始化选中
      const names = dateRes.data.map((item) => item.name);
      setTasks(
        nextTasks
          .map((item) => ({
            ...item,
            checked: names.includes(item.name),
          }))
          .sort(
            (prev, next) =>
              (next.position ? Number(next.position) : 0) -
              (prev.position ? Number(prev.position) : 0)
          )
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
