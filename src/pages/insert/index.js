import React, { useEffect, useState } from "react";
import { Button, TextArea } from "@douyinfe/semi-ui";
import * as publicApi from "@/apis/public";

import styles from "./style.module.less";

function Insert() {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]);

  const onSubmit = async () => {
    setLoading(true);

    if (items.length) {
      await publicApi.update({
        name: "sentences",
        content,
      });
    } else {
      await publicApi.add({
        name: "sentences",
        content,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setInitLoading(true);

      const res = await publicApi.list({ name: "sentences" });

      if (res.data) {
        setItems(res.data);
      }

      setInitLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (items.length) {
      setContent(items[0].content);
    }
  }, [items]);

  const changed = items[0]?.content === content;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>数据录入</h1>
      </div>
      <div className={styles.content}>
        <TextArea
          className={styles.textarea}
          value={content}
          disabled={initLoading}
          onChange={setContent}
          placeholder="请输入"
        />
      </div>
      <div className={styles.footer}>
        <Button
          block
          theme="solid"
          type="primary"
          loading={loading}
          disabled={!content.trim() || changed}
          onClick={onSubmit}
        >
          提交
        </Button>
      </div>
    </div>
  );
}

export default Insert;
