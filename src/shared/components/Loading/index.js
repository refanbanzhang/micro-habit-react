import React from 'react';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';

function Loading() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-[rgba(0, 0, 0, 0.7)]">
      <div className="flex items-center justify-center w-full h-full border-r-[3px] bg-[rgba(0, 0, 0, 0.7)]">
        <Spin indicator={<IconLoading />} />
      </div>
    </div>
  );
}

export default Loading;
