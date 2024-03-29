import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import { IconRefresh } from "@douyinfe/semi-icons";
import useInsert from "@/shared/hooks/useInsert";
import { getRandomIndex, shuffleArray } from "@/shared/utils";
import useIndexPool from './indexPool'

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
  const [sentence, setSentence] = useState("");
  const itemsRef = useRef([]);
  const itemsCopyRef = useRef([]);
  const { indexPool, add, getRandomIndex } = useIndexPool(items.length);
  const [index, setIndex] = useState(0);

  const onRefresh = () => {
    animate(refreshBtnRef.current);

    const nextItems = shuffleArray(itemsRef.current);
    const item = nextItems.pop();
    if (!nextItems.length) {
      itemsRef.current = [...itemsCopyRef.current];
    }
    setSentence(item);
  };

  useEffect(() => {
    if (content) {
      const items = content.split("\n").filter(Boolean);
      setItems(items);
    }
  }, [content]);

  const next = useCallback(() => {
    // 从items中取出一个index
    // 将这个index放入index池，避免重复出现
    // 如何根据池子中的index，避免下一次重复呢？
    // 当index都出现一遍后，重置index池
    const index = getRandomIndex();
    // 随机10个index，出来，直接从这里面的index返回，就不会存在重复了
    // 直接在外面重复
    add(index);
    setIndex(index);
  }, [add, getRandomIndex])

  useEffect(() => {
    if (!items.length) {
      return;
    }

    itemsRef.current = [...items];
    itemsCopyRef.current = [...items];

    next();

    // 在这里如果更新items，就会导致死循环，有没有办法不更新呢？
    // 记录items索引出现呢？只读取items，但是不更新

    onRefresh();
  }, [items, next]);

  const placeholder = <Skeleton.Image style={{ height: 100 }} />;

  return (
    <div>
      <div className="flex justify-between mb-[15px] ">
        <div className="flex items-center text-[14px] font-bold">
          <IconDescriptions className="mr-[5px]" />
          <span>信条</span>
        </div>
        index{index}
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
