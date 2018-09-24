import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from "react-dnd";
import { Task } from "../types/task";
import TaskItem from "./TaskItem";
import TaskItemDragLayer from "../components/TaskItemDragPreview";
import { Column as IColumn } from "../types/column";

export interface ColumnProps {
  name: string;
  classes?: any;
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1
  },
  card: {
    padding: theme.spacing.unit * 2,
    height: "100%",
    color: theme.palette.text.secondary,
    backgroundColor: "#fdfdfd"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    marginBottom: theme.spacing.unit
  }
});

const taskTarget = {
  drop(props: TaskProps, monitor: DropTargetMonitor) {
    props.onDrop(monitor.getItem(), props.column);
  }
};

export interface TaskProps {
  accepts: string[];
  canDrop?: boolean;
  lastDroppedItem?: any;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onDrop: (task: Task, column: IColumn) => void;
  classes?: any;
  name: string;
  column: IColumn;
  index: number;
}

function getColumnStyles(props: TaskProps) {
  const isActive = props.isOver && props.canDrop;

  let backgroundColor = "#fdfdfd";
  if (isActive) {
    backgroundColor = "#f5f5f5";
  }

  return {
    height: 100 + "%",
    backgroundColor: backgroundColor
  };
}

@DropTarget(
  (props: TaskProps) => props.accepts,
  taskTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
class Column extends React.Component<TaskProps> {
  public render() {
    const { connectDropTarget, classes, name } = this.props;
    const { column } = this.props;
    const tasks = column.tasks;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ height: 100 + "%" }}>
          <Card className={classes.card} style={getColumnStyles(this.props)}>
            <CardContent>
              <h2>{name}</h2>

              <ul className={classes.list}>
                {tasks.map((task: Task) => {
                  return (
                    <li key={task.id} className={classes.listItem}>
                      <TaskItem task={task} />
                    </li>
                  );
                })}
                <TaskItemDragLayer snapToGrid={false} />
              </ul>
            </CardContent>
          </Card>
        </div>
      )
    );
  }
}

export default withStyles(styles)(Column);
