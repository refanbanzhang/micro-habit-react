import { IconEmpty, IconToast } from "@douyinfe/semi-icons-lab";

function Tips(props) {
  const { type, children } = props;

  const icon = () => {
    return type === "IconEmpty" ? (
      <IconEmpty className="mb-[20px]" style={{ fontSize: 50 }} />
    ) : (
      <IconToast className="mb-[20px]" style={{ fontSize: 50 }} />
    );
  };

  return (
    <div className="flex flex-col justify-center items-center text-[14px] h-[200px] text-[#999]">
      <div>{icon()}</div>
      {children}
    </div>
  );
}

export default Tips;
