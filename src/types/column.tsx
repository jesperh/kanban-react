import { Task } from "./task";

export interface Column {
  index?: number;
  name: string;
  tasks: Task[];
}
