import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import { IconRefresh } from "@douyinfe/semi-icons";
import useInsert from "@/shared/hooks/useInsert";
import { getRandomIndex } from "@/shared/utils";

import "./style.css";

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (content) {
      const items = content.split("\n").filter(Boolean);
      setItems(items);
    }
  }, [content]);

  const onRefresh = useCallback(() => {
    animate(refreshBtnRef.current);
    const index = getRandomIndex(items.length);
    setIndex(index);
  }, [items]);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    onRefresh();
  }, [onRefresh, items]);

  const sentence = items[index];
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
