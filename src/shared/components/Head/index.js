import { useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconAvatar } from "@douyinfe/semi-icons-lab";
import { logout } from "@/shared/utils";
import router from "@/router";

function Head() {
  const [isDark, setIsDark] = useState(false);
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

  const setDarkMode = (value) => {
    if (value) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const onChangeTheme = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDark(!isDark);
      setDarkMode(!isDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 300,
          easing: "ease-in",
          pseudoElement: isDark
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });
  };

  const username = localStorage.getItem("username");

  return (
    <div className="p-[15px] bg-[#efefef] max-w-[500px] mx-auto">
      <div className="flex items-start justify-between">
        <ul className="flex shrink-0">
          {items.map((item) => (
            <li
              key={item.path}
              className={classnames([
                "mr-[15px] tracking-[3px] cursor-pointer",
                {
                  "font-bold underline underline-offset-[10px]":
                    pathname === item.path,
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
              <Dropdown.Item disabled>{username}</Dropdown.Item>
              <Dropdown.Item onClick={onChangeTheme}>
                {isDark === "light" ? "白天" : "夜晚"}
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>退出登录</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconAvatar size="extra-large" />
        </Dropdown>
      </div>
    </div>
  );
}

export default Head;
