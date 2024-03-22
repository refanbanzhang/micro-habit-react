import { RadioGroup, Radio } from "@douyinfe/semi-ui";

function AddTimeForm({ setValue, value }) {
  return (
    <div className="text-right">
      <RadioGroup onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio value={5}>5分钟</Radio>
        <Radio value={10}>10分钟</Radio>
        <Radio value={15}>15分钟</Radio>
        <Radio value={25}>25分钟</Radio>
        <Radio value={50}>50分钟</Radio>
        <Radio value={100}>100分钟</Radio>
      </RadioGroup>
    </div>
  );
}

export default AddTimeForm;
