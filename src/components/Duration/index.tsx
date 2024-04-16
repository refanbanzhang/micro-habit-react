import { useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import * as recordApi from "@/apis/record";

interface Record {
  createTime: string;
  date: string;
  name: string;
  target: number;
  updateTime: string;
  username: string;
  value: number;
  _id: string;
}

function Duration(props) {
  const { timestamp } = props;
  const [items, setItems] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await recordApi.list();
      const data = res.data ?? [];
      setItems(data);
      setLoading(false);
    };
    fetchData();
  }, [timestamp]);

  // 数据按日期归类
  const obj: {
    [key: string]: Record[];
  } = items.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date].push(curr);
    } else {
      acc[curr.date] = [curr];
    }
    return acc;
  }, {});

  // 计算每天的总时长
  const values = Object.entries(obj).map(([key, values]) => ({
    name: key,
    value: values.reduce((acc, curr) => (acc += curr.value), 0),
  }));

  // 排序并提取top3
  const nextValues = values
    .sort((prev, next) => next.value - prev.value)
    .slice(0, 3);

  const placeholder = <Skeleton.Image style={{ height: 84 }} />;

  return (
    <Skeleton placeholder={placeholder} loading={loading} active>
      {nextValues.map((item) => (
        <div key={item.name}>
          {item.name}: {item.value}
        </div>
      ))}
    </Skeleton>
  );
}

export default Duration;
