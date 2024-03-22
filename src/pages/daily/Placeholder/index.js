import { Skeleton } from "@douyinfe/semi-ui";

const className = "w-full h-[42px] mb-[10px]";

const placeholder = (
  <div>
    <Skeleton.Button className={className} />
    <Skeleton.Button className={className} />
    <Skeleton.Button className={className} />
    <Skeleton.Button className={className} />
  </div>
);

export default placeholder;
