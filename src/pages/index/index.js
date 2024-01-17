import Head from '@/shared/components/Head';
import Year from '@/shared/components/Year';

import styles from './style.less';
import Task from './task';

function Index() {
  return (
    <div className={styles.container}>
      <Head />
      <Task />
      <div style={{ marginBottom: '20px' }} />
      <Year />
    </div>
  );
}

export default Index;
