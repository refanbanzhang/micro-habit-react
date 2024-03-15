import { useState } from "react";
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
      <div style={{ margin: "0 15px 0 15px" }}>
        <Sentence />
      </div>
      <div style={{ margin: "0 15px 0 15px" }}>
        <Task timestamp={timestamp} setTimestamp={setTimestamp} />
      </div>
      <div style={{ margin: "0 15px 0 15px" }}>
        <Year timestamp={timestamp} />
      </div>
      <div style={{ margin: "0 15px 0 15px" }}>
        <Bar />
      </div>
      <div style={{ margin: "0 15px 0 15px" }}>
        <Duration />
      </div>
    </div>
  );
}

export default Index;
