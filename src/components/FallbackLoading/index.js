import { Spin } from '@douyinfe/semi-ui';
import { IconBadge } from '@douyinfe/semi-icons-lab';

function FallbackLoading() {
  return <div className="fixed top-0 right-0 flex items-center justify-center w-[100vw] h-[100vh] bg-[#fff]">
    <Spin size="large" indicator={<IconBadge />} />
  </div>
}

export default FallbackLoading;
