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