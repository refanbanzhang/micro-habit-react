import { Checkbox, Dropdown } from "@douyinfe/semi-ui";
import { IconLink } from "@douyinfe/semi-icons";
import { IconOverflow } from "@douyinfe/semi-icons-lab";

function ListItem(props) {
  const { item, onEdit, onChange, onRemove } = props;

  return (
    <div
      style={{
        "--id": `id${item._id}`,
      }}
      className="item relative flex items-center mb-[10px] p-[10px] rounded-[3px] bg-[#f1f1f1]"
    >
      <Checkbox
        className="mr-[10px]"
        defaultChecked={item.checked}
        onChange={onChange}
      />
      <div className="flex flex-1 justify-center flex-col mr-[10px]">
        <span>{item.name}</span>
        <div className="absolute flex right-[10px]">
          {item.link && (
            <IconLink
              className="text-blue-600"
              onClick={() => window.open(item.link)}
            />
          )}
          <Dropdown
            clickToHide
            trigger="click"
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={onRemove}>删除</Dropdown.Item>
                <Dropdown.Item onClick={onEdit}>编辑</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconOverflow className="ml-[10px] cursor-pointer" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
