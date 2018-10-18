/* @flow */
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';
import { StaticRouter } from 'react-router-dom';
import Routes from '../common/components/router/Routes';
import AppState from '../common/stores/appstate';
const PORT = process.env.PORT || 3011;

/**
 * SSR (server side rendering) only FOR PRODUCTION
 * 
 * This is an isomorphic app, thus, an app that renders both on the client and the server
 * Three main reasons for SSR:
 * - Better Search Engine Optimization (SEO)
 * - Better performance
 * - Better maintainability
*/
const renderView = (req, appstate) => {

  const context = {};
  const componentHTML = renderToString(
    <Provider appstate={appstate}>
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
                <title>AirFi recruitment app</title>
                <link href="index.css" rel="stylesheet" type="text/css" />
                <script>
                    window.__INITIAL_STATE__ = ${ JSON.stringify({ appstate: appstate.toJson() })};
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

createServer((req, res) => {

  if (req.url === '/bundle.js' || req.url === '/bundle.js.map') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    fs.createReadStream(path.resolve(__dirname, `../../dist${req.url}`)).pipe(res);
  }
  else if (req.url === '/index.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.createReadStream(path.resolve(__dirname, '../../dist/index.css')).pipe(res);
  }
  else {
    
    const appstate = new AppState();
    appstate.addItem('foo');
    appstate.addItem('bar');
    res.write(renderView(req, appstate));
    res.end();
  }

}).listen(PORT);
