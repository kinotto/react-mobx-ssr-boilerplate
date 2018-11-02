/* @flow */
import TodoStore from "./domain/TodoStore";

type InitialState = { 
  todoStore: {
    items: Array<string>
  }
};

class RootStore {

  todoStore: TodoStore;

  constructor(initialState: InitialState = { 
    todoStore: {
      items: []
    }
  }) {
    this.todoStore = new TodoStore(this, initialState.todoStore);
    /*
    other stores
    */
  }
}

export default RootStore;