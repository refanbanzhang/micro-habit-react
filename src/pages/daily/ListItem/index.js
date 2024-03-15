import { Checkbox, Popconfirm } from "@douyinfe/semi-ui";
import { IconDelete, IconEdit, IconLink } from "@douyinfe/semi-icons";

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
  const { item, dates, isEditing, onEdit, onChange, onDelTask } = props;

  return (
    <div className={styles.item} key={item._id}>
      <Checkbox
        key={item._id}
        value={item.name}
        style={{ marginTop: 2 }}
        defaultChecked={item.checked}
        onChange={onChange}
      />
      <div className={styles.main}>
        <span className={styles.name}>{item.name}</span>
        <span style={{ display: "none" }}>
          已打卡天数：{getCount(item.name, dates)}
        </span>
        <div className={styles.fixedRight}>
          <Popconfirm
            title="确认"
            content="要删除该条记录吗？"
            onConfirm={() => onDelTask(item._id)}
          >
            <IconDelete
              style={{
                display: isEditing ? "block" : "none",
              }}
              className={styles.btn}
            />
          </Popconfirm>
          <IconEdit
            style={{
              display: isEditing ? "block" : "none",
            }}
            className={styles.btn}
            onClick={() => onEdit(item)}
          />
          {item.link && (
            <IconLink
              className={styles.btn}
              onClick={() => window.open(item.link)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
