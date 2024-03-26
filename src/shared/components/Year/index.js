import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { getYearDatesUntilToday, getLevelClass } from "@/shared/utils";
import * as recordApi from "@/apis/record";
import * as taskApi from "@/apis/task";

const year = getYearDatesUntilToday(371);

function Year(props) {
  const { timestamp } = props;
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const taskRes = await taskApi.list();
      const recordRes = await recordApi.list();

      const tasks = taskRes.data;
      const dates = recordRes.data;
      // 得到当前用户没挺任务目标的总时间
      const targetTotalAmount = tasks.reduce(
        (acc, curr) => (acc += curr.target),
        0
      );
      const list = year.map((item) => {
        const dateData = dates.filter((date) => date.date === item.date);
        const value = dateData.reduce((acc, curr) => (acc += curr.value), 0);

        const allFinished = tasks.every((task) => {
          const target = task.target;
          const record = dateData.find((item) => item.name === task.name);
          return record?.value >= target;
        });

        return {
          ...item,
          value,
          allFinished,
          target: targetTotalAmount,
        };
      });
      setItems(list);
      setLoading(false);
    };

    loadData();
  }, [timestamp]);

  const placeholder = <Skeleton.Image style={{ height: 126 }} />;

  useEffect(() => {
    if (!items.length) {
      return;
    }

    if (containerRef.current) {
      // TODO: 去掉常量
      containerRef.current.scrollLeft = 10000;
    }
  }, [items]);

  return (
    <Skeleton placeholder={placeholder} loading={loading} active>
      <div className="overflow-auto" ref={containerRef}>
        <ul className="flex flex-col flex-wrap w-[951px] h-[126px] mx-auto">
          {items.map((item) => (
            <li
              key={item.date}
              title={`${item.date} ${item.value}`}
              className={`w-[15px] h-[15px] mr-[3px] mb-[3px] bg-[#ebedf0] last:mr-0 ${getLevelClass(
                item.value,
                item.target,
                item.allFinished
              )}`}
            ></li>
          ))}
        </ul>
      </div>
    </Skeleton>
  );
}

export default Year;
