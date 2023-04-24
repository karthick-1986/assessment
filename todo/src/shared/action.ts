import { Task } from "./tasks";



  export const getTaskDetails = (payload: Task) => ({
    type: 'todos/getTaskDetails',
    payload
  });

  export const listTasks = (payload: Task[]) => ({
    type: 'todos/listTasks',
    payload
  });