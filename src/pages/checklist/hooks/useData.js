import { useState, useEffect } from "react";
import { Modal } from "@douyinfe/semi-ui";
import * as dailyTaskApi from "@/apis/dailyTask";
import * as dailyDateApi from "@/apis/dailyDate";
import { getToday } from "@/shared/utils";

/**
 * 根据给定的日期返回那一周的所有日期
 * @param {string} date - 格式为 'YYYY-MM-DD'
 * @returns {string[]} - 那一周的日期数组
 */
const getWeekDatesByDate = (date) => {
  // 将输入的日期字符串转换为Date对象
  const inputDate = new Date(date);

  // 获取输入日期是周几
  const dayOfWeek = inputDate.getDay();

  // 计算周一的日期
  const weekStart = new Date(inputDate);
  weekStart.setDate(inputDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  // 生成并返回那一周的所有日期
  return Array.from({ length: 7 }, (_, i) => {
    const weekDate = new Date(weekStart);
    weekDate.setDate(weekStart.getDate() + i);
    return weekDate.toISOString().split('T')[0];
  });
};

/**
 * 根据给定的日期返回那个月的所有日期
 * @param {string} date - 格式为 'YYYY-MM-DD'
 * @returns {string[]} - 那个月的日期数组
 */
const getMonthDatesByDate = (date) => {
  // 将输入的日期字符串转换为Date对象
  const inputDate = new Date(date);

  // 获取输入日期的年份和月份
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth();

  // 计算那个月的第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 生成并返回那个月的所有日期
  return Array.from({ length: lastDay.getDate() - firstDay.getDate() + 1 }, (_, i) => {
    const monthDate = new Date(firstDay);
    // setDate的参数指定0，那么日期就会被设置为上个月的最后一天
    monthDate.setDate(firstDay.getDate() + i + 1);
    return monthDate.toISOString().split('T')[0];
  });
};

const filterTaskByType = async (tasks, type) => {
  const today = getToday();
  const dates = type === 'week' ? getWeekDatesByDate(today) : getMonthDatesByDate(today)
  const monthTask = tasks.filter(item => item.period === type)
  const monthPros = monthTask.map(async task => {
    const res = await dailyDateApi.list({
      name: task.name,
      dates
    })
    return {
      name: task.name,
      checked: res.data.length,
    }
  })
  const monthDateResItems = await Promise.all(monthPros);
  const checkedMonthTaskNameItems = monthDateResItems.filter(item => item.checked).map(item => item.name);
  return tasks.filter(task => !checkedMonthTaskNameItems.includes(task.name))
}

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
      const nextTasks = await filterTaskByType(taskRes.data, 'week').then((data) => filterTaskByType(data, 'month'))

      // 将dates中的数据，融合到tasks中，实现初始化选中
      const names = dateRes.data.map((item) => item.name);
      setTasks(
        nextTasks.map((item) => ({
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
