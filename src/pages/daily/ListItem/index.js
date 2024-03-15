import { Checkbox, Popconfirm, Dropdown } from "@douyinfe/semi-ui";
import { IconOverflow } from "@douyinfe/semi-icons-lab";

import styles from "./style.less";

/**
 * 获取任务的完成次数
 * @param {string} name
 * @param {Record[]} dates
 * @returns {boolean}
 */
const getCount = (name, dates = []) =>
  dates.filter((date) => date.name === name).length;

function ListItem(props) {
  const { item, dates, onEdit, onChange, onDelTask } = props;

  return (
    <div className={styles.item}>
      <Checkbox
        value={item.name}
        defaultChecked={item.checked}
        onChange={onChange}
      />
      <div className={styles.main}>
        <span className={styles.name}>{item.name}</span>
        <span style={{ display: "none" }}>
          已打卡天数：{getCount(item.name, dates)}
        </span>
        <div className={styles.fixedRight}>
          <Dropdown
            clickToHide
            trigger="click"
            render={
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Popconfirm
                    title="确认"
                    content="要删除该条记录吗？"
                    onConfirm={() => onDelTask(item._id)}
                  >
                    删除
                  </Popconfirm>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onEdit(item)}>编辑</Dropdown.Item>
                <Dropdown.Item
                  disabled={!item.link}
                  onClick={() => window.open(item.link)}
                >
                  跳转
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconOverflow className={styles.btn} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
