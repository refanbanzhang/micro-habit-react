import styles from './style.less'
import Task from './task'

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>微习惯</div>
      <Task />
    </div>
  );
}

export default Index;
