import { useState } from 'react';
import Head from '@/shared/components/Head';
import Year from '@/shared/components/Year';
import Bar from '@/shared/components/Bar';
import Sentence from "@/shared/components/Sentence";
import Duration from '@/shared/components/Duration'

import styles from './style.less';
import Task from './Task';

function Index() {
  const [timestamp, setTimestamp] = useState(Date.now());

  return (
    <div className={styles.container}>
      <Head />
      <Sentence />
      <Task timestamp={timestamp} setTimestamp={setTimestamp} />
      <Year timestamp={timestamp} />
      <Bar />
      <Duration />
    </div>
  );
}

export default Index;
