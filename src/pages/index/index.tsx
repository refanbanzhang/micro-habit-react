import { useState } from "react";
import { IconCopyAdd } from "@douyinfe/semi-icons";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import { useTranslation } from "react-i18next";
import Head from "@/components/Head";
import Year from "@/components/Year";
import Bar from "@/components/Bar";
import Sentence from "@/components/Sentence";
import Duration from "@/components/Duration";
import Fixed from "@/components/Fixed";
import { addResources } from "@/i18n";

import Task from "./Task";
import translation from "./translation.json";
import useAddTask from "./Task/hooks/useAddTask";

addResources(translation);

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());
  // TODO: 这里需要优化一下，不能为了一个外部新增按钮，将所有的数据都提到外面
  // 将标题移到组件内部
  const { visible, setVisible, onAddTaskCancel, onAddTaskConfirm } =
    useAddTask();
  const { t } = useTranslation();

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
            <span>{t("tasks")}</span>
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
          <span>{t("timeBlock")}</span>
        </div>
        <Year timestamp={timestamp} />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] text-[14px] font-bold flex items-center">
          <IconDescriptions className="mr-[5px]" />
          <span>{t("progressBar")}</span>
        </div>
        <Bar />
      </div>
      <div className="mx-[15px] mb-[15px]">
        <div className="mb-[15px] text-[14px] font-bold flex items-center">
          <IconDescriptions className="mr-[5px]" />
          <span>{t("top3")}</span>
        </div>
        <Duration />
      </div>
    </div>
  );
}

export default Index;
