/* @flow */
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { observable } from 'mobx';
import Input from '../ui/input/Input';
import RootStore from '../../stores/RootStore';

type Props = {
  rootStore: RootStore
}

@inject("rootStore")
@observer
class Home extends Component<Props> {

  @observable value = "";

  addTodo = (item: string) => {
    this.props.rootStore.todoStore.addItem(item)
    this.value = "";
  }
  
  render() {
    return (
      <div className="home">
        <div className="home__title">Todo List</div>
        <Input 
          placeholder="Add the todo and press enter"
          value={this.value}
          onChange={evt => this.value = evt.target.value}
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