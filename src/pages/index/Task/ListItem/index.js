import classnames from "classnames";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconOverflow, IconHeart } from "@douyinfe/semi-icons-lab";
import { getPercent, getLevelClassNew } from "@/shared/utils";

import style from "./style.less";

function ListItem({ item, onShowModal, onDelete }) {
  return (
    <div
      className={classnames([
        style.item,
        getLevelClassNew(item.value, item.target),
        {
          [style.finished]: item.value >= item.target,
        },
      ])}
    >
      <div className={style.name}>{item.name}</div>
      <div>目标：{item.target}</div>
      <div>已完成：{item.value}</div>
      <div>进度：{getPercent(item.value, item.target)}%</div>
      <div className={style.fixed}>
        <Dropdown
          trigger={"click"}
          clickToHide
          render={
            <Dropdown.Menu>
              <Dropdown.Item>编辑任务</Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(item)}>
                删除任务
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconOverflow />
        </Dropdown>
      </div>
      <div className={style.fixedBottom}>
        <IconHeart onClick={() => onShowModal(item._id)} />
      </div>
    </div>
  );
}

export default ListItem;
