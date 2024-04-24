import { Input } from "@douyinfe/semi-ui";

function CreateForm({ inputRef, taskName, setTaskName, taskTarget, setTaskTarget }) {
  return (
    <div>
      <div className="mb-[10px]">任务名：</div>
      <Input
        ref={inputRef}
        value={taskName}
        className="mb-[20px]"
        onChange={setTaskName}
      />
      <div className="mb-[10px]">任务目标（分钟）：</div>
      <Input
        value={taskTarget}
        className="mb-[20px]"
        onChange={setTaskTarget}
      />
    </div>
  );
}

export default CreateForm;
