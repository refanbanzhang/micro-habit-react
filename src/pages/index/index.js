import { useState } from "react";
import { IconDescriptions } from "@douyinfe/semi-icons-lab";
import Head from "@/shared/components/Head";
import Year from "@/shared/components/Year";
import Bar from "@/shared/components/Bar";
import Sentence from "@/shared/components/Sentence";
import Duration from "@/shared/components/Duration";

import styles from "./style.less";
import Task from "./Task";

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());

  return (
    <div className={styles.container}>
      <Head />
      <div style={{ margin: "0 15px 25px 15px" }}>
        <div className={styles.title}>
          <IconDescriptions size="large" className={styles.icon} />
          <span>警醒</span>
        </div>
        <Sentence />
      </div>
      <div style={{ margin: "0 15px 25px 15px" }}>
        <div className={styles.title}>
          <IconDescriptions size="large" className={styles.icon} />
          <span>任务</span>
        </div>
        <Task timestamp={timestamp} setTimestamp={setTimestamp} />
      </div>
      <div style={{ margin: "0 15px 25px 15px" }}>
        <div className={styles.title}>
          <IconDescriptions size="large" className={styles.icon} />
          <span>日期块</span>
        </div>
        <Year timestamp={timestamp} />
      </div>
      <div style={{ margin: "0 15px 25px 15px" }}>
        <div className={styles.title}>
          <IconDescriptions size="large" className={styles.icon} />
          <span>进度条</span>
        </div>
        <Bar />
      </div>
      <div style={{ margin: "0 15px 25px 15px" }}>
        <div className={styles.title}>
          <IconDescriptions size="large" className={styles.icon} />
          <span>时长top3</span>
        </div>
        <Duration />
      </div>
    </div>
  );
}

export default Index;
