import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconLanguage } from "@douyinfe/semi-icons";
import { IconAvatar } from "@douyinfe/semi-icons-lab";
import { logout } from "@/shared/utils";
import router from "@/router";
import { langs } from "@/i18n";
import useLanguage from "@/shared/hooks/useLanguage";
import useTheme from "@/shared/hooks/useTheme";

import { start } from "./animation";

function Head() {
  const { t, i18n } = useTranslation();
  const { theme, updateTheme } = useTheme();

  const { setLanguage, getLanguage } = useLanguage();
  const [currentLang, setCurrentLang] = useState(getLanguage());
  const [items] = useState([
    {
      name: "time",
      path: "/",
    },
    {
      name: "checklist",
      path: "/checklist",
    },
    {
      name: "belief",
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

  const onChangeTheme = (event) => {
    const isDark = theme === "dark";
    start(event, isDark, () => {
      // 这里可以更新theme，因为这里更新theme，因为这里的调用源头只会是用户点击按钮，所以不会有死循环的情况
      updateTheme(!isDark ? "dark" : "light");
    });
  };

  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setLanguage(lang);
  };

  useEffect(() => {
    const isDark = theme === "dark";

    const updateThemeUI = (value) => {
      if (value) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    // 这个函数内部不应该存在更新theme的操作
    updateThemeUI(isDark);
  }, [theme]);

  const username = localStorage.getItem("username");

  return (
    <div className="p-[15px] bg-[#efefef] max-w-[500px] mx-auto">
      <div className="flex items-center justify-between">
        <ul className="flex shrink-0">
          {items.map((item) => (
            <li
              key={item.path}
              className={classnames([
                "mr-[15px] tracking-wider cursor-pointer",
                {
                  "font-bold underline underline-offset-[10px]":
                    pathname === item.path,
                },
              ])}
              onClick={() => onClick(item.path)}
            >
              {t(item.name)}
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <Dropdown
            trigger={"click"}
            clickToHide
            render={
              <Dropdown.Menu>
                {Object.keys(langs)
                  .filter((key) => key !== currentLang)
                  .map((key) => (
                    <Dropdown.Item key={key} onClick={() => onChangeLang(key)}>
                      {langs[key].nativeName}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            }
          >
            <IconLanguage className="mr-[10px]" size="large" />
          </Dropdown>
          <Dropdown
            trigger={"click"}
            clickToHide
            render={
              <Dropdown.Menu>
                <Dropdown.Item disabled>{username}</Dropdown.Item>
                <Dropdown.Item onClick={onChangeTheme}>
                  {theme === "light" ? "夜晚" : "白天"}
                </Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>退出登录</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconAvatar size="extra-large" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Head;
