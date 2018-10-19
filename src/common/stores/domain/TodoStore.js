/* @flow */
import { observable, action } from 'mobx';
import RootStore from '../RootStore';

export default class TodoStore<Item> {

  @observable items: Array<Item> = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore, initialState?: TodoStore<Item>) {
    this.rootStore = rootStore;
    this.items = initialState && initialState.items ? initialState.items : [];
  }

  @action
  addItem(item: Item) {
    this.items.push(item);
  }

  toJson() {
    return {
      items: this.items
    };
  }
}
