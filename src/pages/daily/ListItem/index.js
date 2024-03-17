import { Checkbox, Dropdown } from "@douyinfe/semi-ui";
import { IconOverflow } from "@douyinfe/semi-icons-lab";

import styles from "./style.less";

function ListItem(props) {
  const { item, onEdit, onChange, onRemove } = props;

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
                <Dropdown.Item onClick={onRemove}>删除</Dropdown.Item>
                <Dropdown.Item onClick={onEdit}>编辑</Dropdown.Item>
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
