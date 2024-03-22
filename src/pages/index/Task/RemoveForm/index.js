import { Input } from "@douyinfe/semi-ui";

function RemoveForm({ confirmDeleteTaskNameInputRef, confirmDeleteTaskName, setConfirmDeleteTaskName }) {
  return (
    <div>
      <div className="mb-[10px]">请输入任务名：</div>
      <Input
        ref={confirmDeleteTaskNameInputRef}
        value={confirmDeleteTaskName}
        className="mb-[20px]"
        onChange={(value) => setConfirmDeleteTaskName(value)}
      />
    </div>
  );
}

export default RemoveForm;
