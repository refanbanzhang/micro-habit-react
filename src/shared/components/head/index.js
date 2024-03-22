import { useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconAvatar } from "@douyinfe/semi-icons-lab";
import { logout } from "@/shared/utils";
import router from "@/router";
import useThemeContext from "@/shared/hooks/useThemeContext";

function Head() {
  const { state: theme, setState } = useThemeContext();
  const [items] = useState([
    {
      name: "时间",
      path: "/",
    },
    {
      name: "打卡",
      path: "/daily",
    },
    {
      name: "信条",
      path: "/insert",
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
    const nextTheme = theme === "light" ? "dark" : "light";
    setState(nextTheme);
  };

  const username = localStorage.getItem('username');

  return (
    <div className="p-[15px] bg-[#efefef] max-w-[500px] mx-auto">
      <div className="flex items-start justify-between">
        <ul className="flex shrink-0">
          {items.map((item) => (
            <li
              key={item.path}
              className={classnames([
                'mr-[10px] cursor-pointer',
                {
                  'font-bold underline underline-offset-[10px]': pathname === item.path,
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
              <Dropdown.Item disabled>
                {username}
              </Dropdown.Item>
              <Dropdown.Item onClick={onChangeTheme}>
                {theme === "light" ? "白天" : "夜晚"}
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>退出登录</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconAvatar size="extra-large" />
        </Dropdown>
      </div>
    </div >
  );
}

export default Head;
