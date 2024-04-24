import classnames from "classnames";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconOverflow, IconHeart } from "@douyinfe/semi-icons-lab";
import { getPercent, getLevelClassNew } from "@/shared/utils";

function ListItem({ item, onShowModal, onDelete }) {
  return (
    <div
      className={classnames([
        'relative mb-[15px] p-[10px] rounded-[3px] text-[14px] last:mb-0 bg-[#ebedf0]',
        getLevelClassNew(item.value, item.target),
      ])}
    >
      <div className="mb-[5px] text-[16px]">{item.name}</div>
      <div>目标：{item.target}</div>
      <div>已完成：{item.value}</div>
      <div>进度：{getPercent(item.value, item.target)}%</div>
      <div className="absolute top-[10px] right-[10px]">
        <Dropdown
          trigger={"click"}
          clickToHide
          render={
            <Dropdown.Menu>
              <Dropdown.Item>编辑任务</Dropdown.Item>
              <Dropdown.Item onClick={onDelete}>
                删除任务
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconOverflow />
        </Dropdown>
      </div>
      <div className="absolute bottom-[10px] right-[10px]">
        <IconHeart onClick={onShowModal} />
      </div>
    </div>
  );
}

export default ListItem;
