import { useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { getRandomInRange } from "@/shared/utils";
import * as publickApi from "@/apis/public";

import styles from "./style.less";

function Sentence() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [sentence, setSentence] = useState("");

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
  }, [items]);

  const placeholder = (
    <div>
      <Skeleton.Image style={{ height: 100 }} />
    </div>
  );

  return (
    <div style={{ marginBottom: 15 }}>
      <Skeleton placeholder={placeholder} loading={loading} active>
        <div className={styles.container}>{sentence}</div>
      </Skeleton>
    </div>
  );
}

export default Sentence;
