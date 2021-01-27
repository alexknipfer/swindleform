## Running the development server

First, run the development server:

Install dependencies:

```bash
yarn
```

Start dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GraphQL

GraphQL endpoint runs on `http://localhost:3000/api/graphql`.

To access GraphQL Playground for testing you can open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) []

## Use path aliases for importing modules

Paths aliases are setup in the `tsconfig.json` as follows:

```
"@/components/*": ["components/*"],
"@/layouts/*": ["layouts/*"],
"@/apollo/*": ["apollo/*"],
"@/models/*": ["models/*"]
```

For use inside of components

```
import MyComponent from '@/components/MyComponent'
```

## Creating a new model(entity) and associated data access layer(repository)

1. Define your entity

```ts
import { Entity } from 'sourced';

class MyNewEntity extends Entity {
  // define model attributes here
  public name = '';
  constructor(snapshot, events) {
    // define any defaults

    // must call rehydrate as the last step in constructor - look at sourced code to understand more
    this.rehydrate(snapshot, events);
  }

  // every model attribute must have a function associated with it
  updateName(params: { name: string }) {
    this.name = params.name;

    // must always call `digest` - this is how replaying events into current state works
    // first param of digest MUST be the same as the name of the function
    this.digest('updateName', params);
    // if you want to emit an event to say when this happens (can be useful at times)
    this.emit('nameUpdated', params);
    // if you want to "queue" an emit until after the repository has successfully saved this change you can use "enqueue"
    // (useful for "transaction-like" workflows)
    this.enqueue('nameUpdated', params); // WON'T fire until after a successful `repository.commit(myNewEntityInstance)`
  }
}
```
