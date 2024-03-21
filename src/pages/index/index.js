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

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [taskVisible, setTaskVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mb-[15px]">
        <Fixed>
          <Head />
        </Fixed>
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] flex items-center text-[14px] font-bold">
          <IconDescriptions className="mr-[5px]" />
          <span>警醒</span>
        </div>
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
            onClick={() => setTaskVisible(true)}
          />
        </div>
        <Task
          taskVisible={taskVisible}
          setTaskVisible={setTaskVisible}
          timestamp={timestamp}
          setTimestamp={setTimestamp}
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
