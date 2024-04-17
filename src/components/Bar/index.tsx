import { useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import * as taskApi from "@/apis/task";
import * as recordApi from "@/apis/record";

interface Item {
  name: string;
  value: number;
}


// 将一万小时换算为分钟
const target = 10000 * 60;

function Bar() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // TODO: 云对象的单次最大查询长度为1000条，后续需要优化

      // 得到当前用户的所有任务
      const taskRes = await taskApi.list();
      const pros = taskRes.data.map((task) =>
        recordApi.totalValue({ name: task.name }).then((value) => ({
          name: task.name,
          value,
        }))
      );
      const resList = await Promise.all(pros);
      setItems(resList);
      setLoading(false);
    };

    loadData();
  }, []);

  const placeholder = (
    <Skeleton.Image style={{ height: 143 }} />
  );

  return (
    <Skeleton placeholder={placeholder} loading={loading} active>
      {items.map((item) => (
        <div key={item.name} className="mt-[15px] first:mt-0">
          <div className="font-bold mb-[10px]">
            {item.name} 1万小时定律（{(item.value / 60).toFixed(0)}/10000）
          </div>
          <div className="h-[30px] border-r-[3px] bg-[#eaeaea]">
            <div
              className="h-full bg-[#9be9a8]"
              style={{ width: `${(item.value / target) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </Skeleton>
  );
}

export default Bar;
