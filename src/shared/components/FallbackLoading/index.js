import { Spin } from '@douyinfe/semi-ui';
import { IconBadge } from '@douyinfe/semi-icons-lab';

import style from './style.module.less'

function FallbackLoading() {
  return <div className={style.container}>
    <Spin indicator={<IconBadge />} />
  </div>
}

export default FallbackLoading;
