import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { IconRefresh } from "@douyinfe/semi-icons";
import { getRandomInRange } from "@/shared/utils";
import useInsert from "@/shared/hooks/useInsert";

import "./style.css";

function Sentence() {
  const [items, setItems] = useState([]);
  const [sentence, setSentence] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const { initLoading, content } = useInsert();
  const refreshBtnRef = useRef(null);

  useEffect(() => {
    if (content) {
      const sentences = content.split("\n").filter(Boolean);
      setItems(sentences);
    }
  }, [content]);

  useEffect(() => {
    const randomIndex = Math.floor(getRandomInRange(0, items.length - 1));
    const sentence = items.find((_, index) => index === randomIndex);
    setSentence(sentence);
  }, [items, timestamp]);

  const animate = () => {
    refreshBtnRef.current.classList.remove("animate");
    setTimeout(() => {
      refreshBtnRef.current.classList.add("animate");
    });
  };

  const onRefresh = () => {
    animate();
    setTimestamp(Date.now());
  };

  const placeholder = <Skeleton.Image style={{ height: 100 }} />;

  return (
    <Skeleton placeholder={placeholder} loading={initLoading} active>
      <div className="relative flex items-center justify-center min-h-[100px] p-[10px] rounded-[3px] bg-[#eaeaea]">
        <div
          ref={refreshBtnRef}
          className="absolute top-[10px] right-[10px] cursor-pointer"
        >
          <IconRefresh
            onClick={onRefresh}
            style={{ color: "rgba(var(--semi-grey-5), 1)" }}
          />
        </div>

        {sentence}
      </div>
    </Skeleton>
  );
}

export default Sentence;
