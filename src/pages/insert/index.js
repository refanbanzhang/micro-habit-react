import React, { useEffect, useState } from "react";
import { Button, TextArea } from "@douyinfe/semi-ui";
import * as publicApi from "@/apis/public";
import Fixed from "@/shared/components/Fixed";
import Head from "@/shared/components/Head";

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
    <div>
      <div className="flex flex-col h-[100vh] ">
        <Fixed>
          <Head />
        </Fixed>
        <div className="flex-1 overflow-auto">
          <TextArea
            className="h-full p-[15px]"
            style={{ backgroundColor: '#fff' }}
            value={content}
            disabled={initLoading}
            onChange={setContent}
            placeholder="请输入"
          />
        </div>
        <div className="p-[15px]">
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
    </div>
  );
}

export default Insert;
