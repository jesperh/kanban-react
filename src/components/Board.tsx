import * as React from "react";
import AddTask from "../components/AddTask";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Column from "./Column";
import { Column as IColumn } from "../types/column";
import { Task } from "../types/task";

export interface Props {
  columns: IColumn[];
  classes?: any;
  onMove: any;
  onAdd: any;
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
  gridContainer: {
    backgroundColor: "white",
    margin: 0
  }
});

class Board extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  onDrop = (task: Task, column: IColumn) => {
    this.props.onMove(task, column);
  };

  onAddNewTask = (taskName: string) => {
    this.props.onAdd(taskName);
  };

  render() {
    const { classes, columns } = this.props;
    console.log(this.props);
    return (
      <div className="full-height">
        <div>
          <AddTask onAdd={this.onAddNewTask} />
        </div>
        <h2>Tasks</h2>

        <div className="Board-wrapper">
          <div className="test-wrapper">
            <Grid
              container={true}
              direction="row"
              justify="center"
              alignItems="stretch"
              className={classes.gridContainer}
              spacing={8}
            >
              {columns.map((c, index) => {
                return (
                  <Grid key={index} item={true} xs={4}>
                    <Column
                      onDrop={this.onDrop}
                      accepts={["box"]}
                      name={c.name}
                      column={c}
                      index={index}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Board);
