import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import { IconRefresh } from "@douyinfe/semi-icons";
import useInsert from "@/shared/hooks/useInsert";

import "./style.css";

const getRandomIndex = (max) => {
  // 确保随机出来的数字不会大于max
  const value = Math.random() * max;
  return Math.floor(value);
};

const animate = (element) => {
  element.classList.remove("animate");
  setTimeout(() => {
    element.classList.add("animate");
  });
};

function Sentence() {
  const { initLoading, content } = useInsert();
  const refreshBtnRef = useRef(null);
  const [items, setItems] = useState([]);
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    if (content) {
      const items = content.split("\n").filter(Boolean);
      setItems(items);
    }
  }, [content]);

  const renderSentence = useCallback(() => {
    // TODO: 提取为一个独立的函数
    const nextItems = [...items];
    const randomIndex = getRandomIndex(nextItems.length);
    const [item] = nextItems.splice(randomIndex, 1);

    setSentence(item);
  }, [items]);

  useEffect(() => {
    renderSentence();
  }, [renderSentence]);

  const onRefresh = () => {
    animate(refreshBtnRef.current);
    renderSentence();
  };

  const placeholder = <Skeleton.Image style={{ height: 100 }} />;

  return (
    <div>
      <div className="flex justify-between mb-[15px] ">
        <div className="flex items-center text-[14px] font-bold">
          <IconDescriptions className="mr-[5px]" />
          <span>信条</span>
        </div>
        <div
          ref={refreshBtnRef}
          className="top-[10px] right-[10px] cursor-pointer"
        >
          <IconRefresh
            onClick={onRefresh}
            style={{ color: "rgba(var(--semi-grey-5), 1)" }}
          />
        </div>
      </div>
      <Skeleton placeholder={placeholder} loading={initLoading} active>
        <div className="relative flex items-center justify-center min-h-[100px] p-[10px] rounded-[3px] bg-[#eaeaea]">
          {sentence}
        </div>
      </Skeleton>
    </div>
  );
}

export default Sentence;
