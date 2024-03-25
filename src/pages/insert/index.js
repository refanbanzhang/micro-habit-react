import React from "react";
import { Button, TextArea, Skeleton } from "@douyinfe/semi-ui";
import Fixed from "@/shared/components/Fixed";
import Head from "@/shared/components/Head";
import If from "@/shared/components/IF";

import useInsert from "@/shared/hooks/useInsert";

function Sentence() {
  const { initLoading, submitLoading, content, setContent, onSubmit, changed } =
    useInsert();

  return (
    <div className="flex flex-col h-[100vh] ">
      <Fixed>
        <Head />
      </Fixed>
      <div className="flex-1 overflow-auto">
        <If value={initLoading}>
          <div className="m-[15px]">
            <Skeleton.Paragraph style={{ fontSize: "20px" }} rows={20} />
          </div>
        </If>
        <If value={!initLoading}>
          <TextArea
            className="h-full p-[15px]"
            style={{ backgroundColor: "#fff" }}
            value={content}
            disabled={initLoading}
            onChange={setContent}
            placeholder="请输入"
          />
        </If>
      </div>
      <div className="p-[15px]">
        <Button
          block
          theme="solid"
          type="primary"
          loading={submitLoading}
          disabled={!content.trim() || changed}
          onClick={onSubmit}
        >
          提交
        </Button>
      </div>
    </div>
  );
}

export default Sentence;
