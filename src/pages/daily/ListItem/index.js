import { Checkbox, Popconfirm, Dropdown } from "@douyinfe/semi-ui";
import { IconOverflow } from "@douyinfe/semi-icons-lab";

import styles from "./style.less";

function ListItem(props) {
  const { item, onEdit, onChange, onDelTask } = props;

  return (
    <div className={styles.container}>
      <Checkbox
        value={item.name}
        defaultChecked={item.checked}
        onChange={onChange}
      />
      <div className={styles.main}>
        <span className={styles.name}>{item.name}</span>
        <div className={styles.fixed}>
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
