/* @flow */
import { observable, action } from 'mobx';
import RootStore from '../RootStore';

type InitialState = {
  items: Array<string>
}

export default class TodoStore {

  @observable items: Array<string> = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore, initialState?: InitialState) {
    this.rootStore = rootStore;
    this.items = (initialState && initialState.items) ? initialState.items : [];
  }

  @action
  addItem(item: string) {
    this.items.push(item);
  }

  toJson() {
    return {
      items: this.items
    };
  }
}
