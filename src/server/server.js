/* @flow */
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';
import { StaticRouter } from 'react-router-dom';
import Routes from '../common/components/Routes';
import RootStore from '../common/stores/RootStore';
const express = require('express');
const app = express();

/**
 * SSR (server side rendering)
 * 
 * This is an isomorphic app, thus, an app that renders both on the client and the server
 * Three main reasons for SSR:
 * - Better Search Engine Optimization (SEO)
 * - Better performance
 * - Better maintainability
*/
const renderView = (req, rootStore) => {

  const context = {};
  const componentHTML = renderToString(
    <Provider rootStore={rootStore}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ReactMobxSSR starter</title>
        <link href="index.css" rel="stylesheet" type="text/css" />
        <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify({ todoStore: rootStore.todoStore.toJson() })};
        </script>
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;

  return HTML;
};

app.get('/', (req, res) => {
  const rootStore = new RootStore();
  rootStore.todoStore.addItem('Todo1 (server)');
  rootStore.todoStore.addItem('Todo2 (server)');
  res.write(renderView(req, rootStore));
  res.end();
})

app.get(['/bundle.js', '/bundle.js.map'], (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  fs.createReadStream(path.resolve(__dirname, `../../dist${req.url}`)).pipe(res);
})

app.get('/index.css', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  fs.createReadStream(path.resolve(__dirname, '../../dist/index.css')).pipe(res);
})

app.listen(process.env.PORT || 3011, console.log.bind(this, `server listeneing on port ${process.env.PORT || 3011}`));