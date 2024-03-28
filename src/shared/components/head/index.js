import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { useTranslation } from 'react-i18next';
import { Dropdown } from "@douyinfe/semi-ui";
import { IconLanguage } from "@douyinfe/semi-icons";
import { IconAvatar } from "@douyinfe/semi-icons-lab";
import { logout } from "@/shared/utils";
import router from "@/router";
import { defaultLang, langs } from '@/i18n';

import { start } from "./animation";

const initialIsDark = localStorage.getItem("isDark");

function Head() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(JSON.parse(initialIsDark));
  const [currentLang, setCurrentLang] = useState(defaultLang);
  const [items] = useState([
    {
      name: 'time',
      path: "/",
    },
    {
      name: 'checklist',
      path: "/checklist",
    },
    {
      name: 'belief',
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
      localStorage.setItem("isDark", true);
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("isDark", false);
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const onChangeTheme = (event) => {
    start(event, isDark, () => {
      setIsDark(!isDark);
      setDarkMode(!isDark);
    });
  };

  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang)
  }

  useEffect(() => {
    setDarkMode(isDark);
  }, [isDark]);

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
                {Object.keys(langs).filter(key => key !== currentLang).map((key) => <Dropdown.Item onClick={() => onChangeLang(key)}>{langs[key].nativeName}</Dropdown.Item>)}
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
                  {isDark ? "夜晚" : "白天"}
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
