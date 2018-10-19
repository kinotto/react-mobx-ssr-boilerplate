import TodoStore from "./domain/TodoStore";


class RootStore {
  
  constructor(initialState: {} = {}) {
    this.todoStore = new TodoStore(this, initialState.todoStore);
    /*
    other stores
    */
  }
}

export default RootStore;