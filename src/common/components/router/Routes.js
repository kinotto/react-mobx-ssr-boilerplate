/* @flow */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../ui/not-found/NotFound';
import { hot } from 'react-hot-loader';
import Home from '../containers/Home';

declare var window: ?Object;

type Props = {};

class Routes extends Component<Props> {

  constructor(props: Props) {
    super(props);
    console.log(typeof window === 'object' ? 'Rendering client-side' : 'Rendering server-side');
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />

        {/* other routes */}

        <Route component={NotFound} />
      </Switch>
    )
  }
}

//ADD hot reloading for dev
export default hot(module)(Routes);