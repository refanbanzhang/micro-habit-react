import { useState } from "react";
import { IconCopyAdd } from "@douyinfe/semi-icons";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import Head from "@/shared/components/Head";
import Year from "@/shared/components/Year";
import Bar from "@/shared/components/Bar";
import Sentence from "@/shared/components/Sentence";
import Duration from "@/shared/components/Duration";
import Fixed from "@/shared/components/Fixed";

import styles from "./style.module.less";
import Task from "./Task";

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [taskVisible, setTaskVisible] = useState(false);

  return (
    <div className={styles.container}>
      <div className="mb-[15px]">
        <Fixed>
          <Head />
        </Fixed>
      </div>
      <div className={styles.margin}>
        <div className={`${styles.border} ${styles.flex2} ${styles.title}`}>
          <IconDescriptions className={styles.marginRight5} />
          <span>警醒</span>
        </div>
        <Sentence />
      </div>
      <div className={styles.margin}>
        <div className={`${styles.border} ${styles.flex}`}>
          <div className={`${styles.title} ${styles.flex}`}>
            <IconDescriptions className={styles.marginRight5} />
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
      <div className={styles.margin}>
        <div className={`${styles.border} ${styles.title} ${styles.flex2}`}>
          <IconDescriptions className={styles.marginRight5} />
          <span>日期块</span>
        </div>
        <Year timestamp={timestamp} />
      </div>
      <div className={styles.margin}>
        <div className={`${styles.border} ${styles.title} ${styles.flex2}`}>
          <IconDescriptions className={styles.marginRight5} />
          <span>进度条</span>
        </div>
        <Bar />
      </div>
      <div className={styles.margin}>
        <div className={`${styles.border} ${styles.title} ${styles.flex2}`}>
          <IconDescriptions className={styles.marginRight5} />
          <span>时长top3</span>
        </div>
        <Duration />
      </div>
    </div>
  );
}

export default Index;
