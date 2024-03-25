import { Skeleton, Button } from "@douyinfe/semi-ui";

function History({ items, initLoading, onRevert }) {
  const placeholder = <Skeleton.Image style={{ height: 137 }} />;

  return (
    <Skeleton placeholder={placeholder} loading={initLoading} active>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center mt-[15px] first:mt-0"
        >
          <div className="font-bold mb-[10px]">
            <div>updateUser：{item.updateUser}</div>
            <div>updateTime：{item.updateTime}</div>
            <div>
              content：
              <div>{item.content}</div>
            </div>
          </div>
          <Button onClick={() => onRevert(item._id)}>回滚到此版本</Button>
        </div>
      ))}
    </Skeleton>
  );
}

export default History;
