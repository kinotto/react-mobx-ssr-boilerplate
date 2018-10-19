/* @flow */
import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../common/components/router/Routes';
import AppState from '../common/stores/Appstate';

declare var window: {
    __INITIAL_STATE__: Object,
    location: {
        pathname: string
    }
};

const appstate = new AppState(window.__INITIAL_STATE__);
const element = document.getElementById('root');

if(element)
    render(
        <Provider appstate={ appstate }>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>,
        element
    );
