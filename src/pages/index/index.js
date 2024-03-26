import { useState } from "react";
import { IconCopyAdd } from "@douyinfe/semi-icons";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import Head from "@/shared/components/Head";
import Year from "@/shared/components/Year";
import Bar from "@/shared/components/Bar";
import Sentence from "@/shared/components/Sentence";
import Duration from "@/shared/components/Duration";
import Fixed from "@/shared/components/Fixed";

import Task from "./Task";
import useAddTask from "./Task/hooks/useAddTask";

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());
  // TODO: 这里需要优化一下，不能为了一个外部新增按钮，将所有的数据都提到外面
  const { visible, setVisible, onAddTaskCancel, onAddTaskConfirm } =
    useAddTask();

  return (
    <div className="flex flex-col">
      <div className="mb-[15px]">
        <Fixed>
          <Head />
        </Fixed>
      </div>
      <div className="mx-[15px] mb-[15px]">
        <Sentence />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] flex items-center justify-between">
          <div className="text-[14px] font-bold flex items-center justify-between">
            <IconDescriptions className="mr-[5px]" />
            <span>任务</span>
          </div>
          <IconCopyAdd
            style={{ color: "rgba(var(--semi-grey-4), 1)" }}
            onClick={() => setVisible(true)}
          />
        </div>
        <Task
          taskVisible={visible}
          setTaskVisible={setVisible}
          timestamp={timestamp}
          setTimestamp={setTimestamp}
          onAddTaskCancel={onAddTaskCancel}
          onAddTaskConfirm={onAddTaskConfirm}
        />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] text-[14px] font-bold flex items-center">
          <IconDescriptions className="mr-[5px]" />
          <span>日期块</span>
        </div>
        <Year timestamp={timestamp} />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] text-[14px] font-bold flex items-center">
          <IconDescriptions className="mr-[5px]" />
          <span>进度条</span>
        </div>
        <Bar />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] text-[14px] font-bold flex items-center">
          <IconDescriptions className="mr-[5px]" />
          <span>时长top3</span>
        </div>
        <Duration />
      </div>
    </div>
  );
}

export default Index;
