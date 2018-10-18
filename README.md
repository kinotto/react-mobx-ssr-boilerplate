# AirFi recruitment app

# Build and run
```
yarn install or npm install 
yarn build:client or npm run build:client
yarn start or npm run start (for dev environments)
yarn start-prod or npm run start-prod (for production environments)
```

# Description
Isomorphic application that benefit of SSR (server side rendering), already set up with:
- React 16
- MobX (state management library) https://github.com/mobxjs/mobx
- reactive approach to update component state (using ES2016 decorators e.g. @observable, @observer)
- flow (static type checking at compile time)
- React Router 4
- webpack
- unit testing with Jest


# Coding convention
- every component must start with a capital letter.
- unit tests should be placed in the same folder of the component and should following this naming "componentName.test.js"
- any scss must be placed in the style folder and must have the prefix _ if is a partial file