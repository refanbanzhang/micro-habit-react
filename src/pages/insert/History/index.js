import dayjs from "dayjs";
import { Skeleton, Button } from "@douyinfe/semi-ui";

function History({ items, initLoading, onRevert }) {
  const placeholder = <Skeleton.Image style={{ height: 137 }} />;

  return (
    <Skeleton placeholder={placeholder} loading={initLoading} active>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center rounded-[3px] mt-[15px] first:mt-0 bg-[#efefef] p-[15px]"
        >
          <div className="font-bold mb-[10px]">
            <div className="flex justify-between mb-[10px]">
              <div className="flex-shrink-0 w-[100px]">操作人：</div>
              <div>{item.updateUser}</div>
            </div>
            <div className="flex justify-between mb-[10px]">
              <div className="flex-shrink-0 w-[100px]">修改时间：</div>
              <div>{dayjs(item.updateTime).format("MM-DD-YYYY HH:mm:ss")}</div>
            </div>
            <div className="flex justify-between mb-[10px]">
              <div className="flex-shrink-0 w-[100px]">内容：</div>
              <div>{item.content.slice(0, 50)}...</div>
            </div>
            <div className="text-right">
              <Button onClick={() => onRevert(item._id)}>回滚到此版本</Button>
            </div>
          </div>
        </div>
      ))}
    </Skeleton>
  );
}

export default History;
