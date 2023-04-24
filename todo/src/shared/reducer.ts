import { Task } from "./tasks";

const initialState = {
    tasks: [],
    id: 0,
    isOpen: false ,
    addForm: {
      name: '',
      description: '',
    }
}

type Action = {type: string,payload: any};
const TaskReducer = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'todos/getTaskDetails':
        return {
            ...state,
            taskDetails: action.payload
        }
    
        

    case 'todos/listTasks' :
        return {
            ...state,
            tasks: action.payload
        }
    case 'todos/toggleModal' :
        return {
            ...state,
            isOpen: action.payload
        }
    case 'todos/makeFormEmpty' :
        return {
            ...state,
            addForm: {
                name: '',
                description: '',
              }
        }


  default:
    return state
  }
}

export default TaskReducer;


