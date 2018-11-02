/* @flow */
import TodoStore from "./domain/TodoStore";

type InitialState = { 
  todoStore: {
    items: Array<string>
  }
};

class RootStore {

  todoStore: TodoStore;

  defaultState: InitialState = { 
    todoStore: {
      items: []
    }
  }

  constructor(initialState: InitialState = this.defaultState) {
    this.todoStore = new TodoStore(this, initialState.todoStore);
    /*
    other stores
    */
  }
}

export default RootStore;