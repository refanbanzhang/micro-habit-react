import { DragDropContext, Droppable } from "react-beautiful-dnd";

function DraggableWrap(props) {
  const { onDragEnd, children } = props;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableWrap;
