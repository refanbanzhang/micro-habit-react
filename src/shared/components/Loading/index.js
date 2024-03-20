import React from 'react';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';

import styles from './style.module.less';

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin indicator={<IconLoading />} />
      </div>
    </div>
  );
}

export default Loading;
