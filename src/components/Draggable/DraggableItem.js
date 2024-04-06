import { Draggable } from "react-beautiful-dnd";

function DraggableItem({ id, index, children, ...rest }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...rest}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
