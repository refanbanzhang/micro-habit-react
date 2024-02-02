import Head from '@/shared/components/Head';
import Year from '@/shared/components/Year';
import Bar from '@/shared/components/Bar';

import styles from './style.less';
import Task from './Task';

function Index() {
  return (
    <div className={styles.container}>
      <Head />
      <Task style={{ marginBottom: '20px' }} />
      <Year style={{ marginBottom: '20px' }} />
      <Bar />
    </div>
  );
}

export default Index;
