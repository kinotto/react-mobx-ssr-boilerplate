/* @flow */
import * as React from 'react';
import { observer, inject } from "mobx-react";
import RootStore from '../../../stores/RootStore';
declare var window: ?Object;

type Props = {
  rootStore: RootStore
};

@inject('rootStore')
@observer
class Button extends React.Component<Props> {

  static defaultProps = {
    todoStore: new RootStore()
  };

  constructor(props: Props) {
    super(props);
  }

  addItem = () => this.props.rootStore.todoStore.addItem('foobar');

  render() {

    const { todoStore } = this.props.rootStore;

    return (
      <div>
        <button onClick={this.addItem} className="button__test">foobar</button>
        <ul>
          {todoStore.items.map((item, key) => <li key={key}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default Button;