import * as React from "react";
import { DragLayer, XYCoord } from "react-dnd";
import TaskItem from "./TaskItem";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(props: TaskItemDragLayerProps) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

export interface TaskItemDragLayerProps {
  item?: any;
  itemType?: string;
  initialOffset?: XYCoord;
  currentOffset?: XYCoord;
  isDragging?: boolean;
  snapToGrid: boolean;
}

const TaskItemDragLayer: React.SFC<TaskItemDragLayerProps> = props => {
  const { item, itemType, isDragging } = props;

  function renderItem() {
    switch (itemType) {
      case "box":
        return (
          <div
            style={{
              width: 25 + "%"
            }}
          >
            <TaskItem task={item} />
          </div>
        );
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
};

export default DragLayer<TaskItemDragLayerProps>(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(TaskItemDragLayer);
