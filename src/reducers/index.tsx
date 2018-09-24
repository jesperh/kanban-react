import { TaskAction } from "../actions";
import { StoreState } from "../types/index";
import { ADD_TASK, MOVE_TASK, REMOVE_TASK } from "../constants/index";
import { Task } from "../types/task";
import { Column } from "../types/column";

const initialState: StoreState = {
  columns: [
    {
      name: "TODO",
      tasks: [
        { id: 0, name: "Add backend" },
        { id: 1, name: "Make UI prettier" },
        { id: 4, name: "Make PWA" }
      ]
    },
    {
      name: "In Progress",
      tasks: [{ id: 2, name: "Review source code" }]
    },
    {
      name: "Done",
      tasks: [{ id: 3, name: "Make MVP" }]
    }
  ]
};

function newIndex(columns: Column[]): number {
  const ids: number[] = [];
  columns.forEach(c => ids.push(...c.tasks.map(t => t.id)));
  const max = ids.reduce((max, current) => (current > max ? current : max), 0);
  return max + 1;
}

export function task(
  state: StoreState = initialState,
  action: TaskAction
): StoreState {
  switch (action.type) {
    case ADD_TASK:
      const task: Task = { id: newIndex(state.columns), name: action.data };
      const newCols = state.columns.map((c, i) => {
        if (i === 0) {
          const tasks = [...c.tasks, task];
          return { ...c, tasks };
        } else {
          return c;
        }
      });
      return { ...state, columns: newCols };

    case REMOVE_TASK:
      // const newTasks = state.tasks.filter(task => task.id != action.data.id);
      return { ...state };
    case MOVE_TASK: {
      const columns = state.columns;
      const column = action.data.column;
      const task = action.data.task;
      const index = columns.findIndex(c => c.name === column.name);
      const targetColumn = columns[index];

      // Current data structure doesn't provide a direct
      // way to refer the board which the task is being
      // moved from. As a workaround, find the source
      // column by checking manually which column the
      // task belongs to.
      let sourceColIndex = columns.findIndex(c => {
        const i = c.tasks.findIndex(t => t.id === task.id);
        return i > -1;
      });

      columns[sourceColIndex].tasks = columns[sourceColIndex].tasks.filter(
        t => t.id !== task.id
      );

      targetColumn.tasks.push(action.data.task);

      return { ...state, columns: columns };
    }
    default:
      return state;
  }
}
