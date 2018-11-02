/* @flow */
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Input from '../ui/input/Input';
import RootStore from '../../stores/RootStore';

type Props = {
  rootStore: RootStore
}

@inject("rootStore")
@observer
class Home extends Component<Props> {

  addTodo = (item: string) => this.props.rootStore.todoStore.addItem(item);

  render() {
    return (
      <div className="home">
        <div className="home__title">Todo List</div>
        <Input 
          placeholder="Add the todo and press enter"
          onKeyPress={evt => evt.key === "Enter" && this.addTodo(evt.target.value)}
        />

        <div className="home__results">
          {
            this.props.rootStore.todoStore.items.map((item, idx) => <div key={idx}>{item}</div>)
          }
        </div>
      </div>
    )
  }
}

export default Home;