import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
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

  const placeholder = (
    <div>
      <Skeleton.Image className="h-[126px]"/>
    </div>
  );

  const per = Math.ceil(items.length / 7);
  const nextItems = items.reduce((acc, currValue, currIndex) => {
    const index = Math.floor(currIndex / per);
    if (acc[index]) {
      acc[index].push(currValue);
    } else {
      acc[index] = [currValue];
    }
    return acc;
  }, []);

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
        {nextItems.map((item, index) => (
          <ul className="flex w-[951px] mx-auto" key={index}>
            {item.map((_item) => (
              <li
                key={_item.date}
                title={`${_item.date} ${_item.value}`}
                className={`w-[15px] h-[15px] mr-[3px] mb-[3px] bg-[#ebedf0] last:mr-0 ${getLevelClass(_item.value, _item.target, _item.allFinished)}`}
              ></li>
            ))}
          </ul>
        ))}
      </div>
    </Skeleton>
  );
}

export default Year;
