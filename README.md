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
- webpack (livecompiling and hot reload)
- unit testing with Jest
- sass loader
- custom VScode config for debugging 

# Coding convention
- every Class must start with a capital letter.
- unit tests should be placed in the same folder of the component and should following this naming "componentName.test.js" in order to be run automatically by Jest

# Basic folder structure:
- Stores
   * Domain stores:
       stores the data which'll be needed in your app. (user data, for example todos array)
   * View/UI: stores:
       stores the data which'll be needed to present your app (loading, error variables..)
       if the state of the store is too simple there's no need of a specific component ui-store.

- Models: Here you can define the data models

- Services: Here you can make services like api calls, inside singleton with static methods that will be used directly by the stores

- Components: Container or Smart Component, Dumb or presentational component

- Style: any scss must be placed in the style folder and must have the prefix _ if is a partial file