import { useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconConfig } from "@douyinfe/semi-icons-lab";
import { logout } from "@/shared/utils";
import router from "@/router";
import useThemeContext from "@/shared/hooks/useThemeContext";

import styles from "./style.module.less";

function Head() {
  const themeContext = useThemeContext();
  const [items] = useState([
    {
      name: "时间",
      path: "/",
    },
    {
      name: "打卡",
      path: "/daily",
    },
  ]);
  const { pathname } = useLocation();

  const onClick = (path) => {
    router.navigate(path);
  };

  const onLogout = () => {
    logout();
    router.navigate("/login");
  };

  const onChangeTheme = () => {
    const nextTheme = themeContext.state === "light" ? "dark" : "light";
    themeContext.setState(nextTheme);
  };

  return (
    <div className={classnames([styles.container, styles[themeContext.state]])}>
      <div className={styles.box}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.path}
              className={classnames([
                styles.item,
                {
                  [styles.active]: pathname === item.path,
                },
              ])}
              onClick={() => onClick(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <Dropdown
          trigger={"click"}
          clickToHide
          render={
            <Dropdown.Menu>
              <Dropdown.Item onClick={onChangeTheme}>
                {themeContext.state === "light" ? "白天" : "夜晚"}
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>退出登录</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconConfig />
        </Dropdown>
      </div>
    </div>
  );
}

export default Head;
