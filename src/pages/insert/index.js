import React, { useState } from "react";
import { Button, TextArea, Skeleton, Modal } from "@douyinfe/semi-ui";
import { IconHistory } from "@douyinfe/semi-icons";
import Fixed from "@/shared/components/Fixed";
import Head from "@/shared/components/Head";
import If from "@/shared/components/IF";
import useInsert from "@/shared/hooks/useInsert";

import History from "./History";

function Sentence() {
  const {
    initLoading,
    submitLoading,
    items,
    content,
    setContent,
    onSubmit,
    onRevert,
    changed,
  } = useInsert();
  const [visible, setVisible] = useState(false);

  const onShowHistory = () => {
    setVisible(true);
  };

  const onDone = () => {
    setVisible(false);
  };

  return (
    <div className="flex flex-col h-[100vh] ">
      <Fixed>
        <Head />
      </Fixed>
      <div className="relative flex-1 overflow-auto">
        <If value={initLoading}>
          <div className="m-[15px]">
            <Skeleton.Paragraph style={{ fontSize: "20px" }} rows={20} />
          </div>
        </If>
        <If value={!initLoading}>
          <div className="absolute top-[15px] right-[15px] z-10">
            <IconHistory
              size="large"
              style={{ color: "#666" }}
              onClick={onShowHistory}
            />
          </div>
          <TextArea
            className="h-full p-[15px] pt-[25px]"
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

      <Modal
        title="历史记录"
        fullScreen
        visible={visible}
        bodyStyle={{
          overflow: "auto",
          marginBottom: 15,
        }}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <History
          initLoading={initLoading}
          items={items}
          onRevert={async (id) => {
            await onRevert(id);
            onDone();
          }}
        />
      </Modal>
    </div>
  );
}

export default Sentence;
