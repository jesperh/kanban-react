import * as constants from "../constants";
import { Task } from "../types/task";
import { Column as IColumn } from "../types/column";

export interface AddTask {
  type: constants.ADD_TASK;
  data: string;
}

export interface RemoveTask {
  type: constants.REMOVE_TASK;
  data: Task;
}

export interface MoveTask {
  type: constants.MOVE_TASK;
  data: { task: Task; column: IColumn };
}

export type TaskAction = AddTask | RemoveTask | MoveTask;

export function addTask(task: string): AddTask {
  return {
    type: constants.ADD_TASK,
    data: task
  };
}

export function removeTask(task: Task): RemoveTask {
  return {
    type: constants.REMOVE_TASK,
    data: task
  };
}

export function moveTask(task: Task, column: IColumn): MoveTask {
  return {
    type: constants.MOVE_TASK,
    data: { task, column }
  };
}
