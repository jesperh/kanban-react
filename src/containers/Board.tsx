import * as actions from "../actions/";
import { StoreState } from "../types/index";
import { connect } from "react-redux";
import { Task } from "../types/task";
import { Dispatch } from "redux";
import Board from "../components/Board";
import { Column as IColumn } from "../types/column";

export function mapStateToProps(state: StoreState) {
  return {
    columns: state.columns
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.TaskAction>) {
  return {
    onAdd: (taskName: string) => dispatch(actions.addTask(taskName)),
    onMove: (task: Task, column: IColumn) =>
      dispatch(actions.moveTask(task, column))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
