import React from "react";
import { Button, TextArea } from "@douyinfe/semi-ui";
import Fixed from "@/shared/components/Fixed";
import Head from "@/shared/components/Head";

import useInsert from "./useInsert";

function Insert() {
  const { loading, initLoading, content, setContent, onSubmit, changed } =
    useInsert();

  return (
    <div className="flex flex-col h-[100vh] ">
      <Fixed>
        <Head />
      </Fixed>
      <div className="flex-1 overflow-auto">
        <TextArea
          className="h-full p-[15px]"
          style={{ backgroundColor: "#fff" }}
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
  );
}

export default Insert;
