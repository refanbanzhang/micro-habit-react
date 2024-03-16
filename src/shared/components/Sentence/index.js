import { useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { IconRefresh } from "@douyinfe/semi-icons";
import { getRandomInRange } from "@/shared/utils";
import * as publickApi from "@/apis/public";

import styles from "./style.less";

function Sentence() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [sentence, setSentence] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await publickApi.list({ name: "sentences" });

      const data = res.data ?? [];
      if (data.length) {
        const sentences = data[0].content.split("\n").filter(Boolean);
        setItems(sentences);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(getRandomInRange(0, items.length - 1));
    const sententce = items.find((_, index) => index === randomIndex);
    setSentence(sententce);
  }, [items, timestamp]);

  const onRefresh = () => {
    setTimestamp(Date.now());
  };

  const placeholder = (
    <div>
      <Skeleton.Image style={{ height: 100 }} />
    </div>
  );

  return (
    <Skeleton placeholder={placeholder} loading={loading} active>
      <div className={styles.container}>
        <IconRefresh
          className={styles.fixed}
          onClick={onRefresh}
          style={{ color: "rgba(var(--semi-grey-5), 1)" }}
        />
        {sentence}
      </div>
    </Skeleton>
  );
}

export default Sentence;
