import * as React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Task } from "../types/task";
import { Card, CardContent, Typography } from "@material-ui/core";

export interface TaskItemProps {
  task: Task;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDragPreview?: ConnectDragPreview;
}

const boxSource = {
  beginDrag(props: TaskItemProps) {
    return props.task;
  }
};

function getItemStyles(props: TaskItemProps) {
  if (props.isDragging) {
    return {
      width: 250 + "px",
      visible: "hidden"
    };
  }
  return;
}

@DragSource(
  "box",
  boxSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)
export default class TaskItem extends React.Component<TaskItemProps> {
  public componentDidMount() {
    const { connectDragPreview } = this.props;

    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }

  public renderTask = (task: Task) => {
    return (
      <Card style={getItemStyles(this.props)} raised={this.props.isDragging}>
        <CardContent>
          <Typography color="textSecondary">{task.name}</Typography>
        </CardContent>
      </Card>
    );
  };

  public render() {
    const { isDragging, connectDragSource } = this.props;
    const { task } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDragSource(<div style={{ opacity }}>{this.renderTask(task)}</div>)
    );
  }
}
