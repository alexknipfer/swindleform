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

To access GraphQL Playground for testing you can open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

## GraphQL TypeScript Codegen

We use [GraphQL Code Generator](https://www.google.com) to generate our types and apollo client hooks based on our schema. Generation runs in watch mode when running `yarn run dev`, so if you make a change to your graphql files, code generation will run.

The schema generated types will be generated in `graphql/types.ts`
The hooks and necessary typings for apollo client will be generated within the same location as your `.graphql` file with the `.generated.tsx` extension.

The following scripts are also available for use:

Generate the typings based on current schema:

```
yarn generate
```

Run generation in watch mode for real time changes (useful when actively making changes to the schema):

```
yarn generate:watch
```

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

2. Create the repository - the `DbConnection` class is the consolodation point for these to handle the logic of ensuring the database is connected

- think of the repository as the data access layer - it handles deconstructing the entity into snapshots and events, and will also properly "reconstruct" or replay the events and snapshots from the db back into memory to an Entity class instance
- I also added a convenience method to expose all of the `Repository` class' methods as async calls with Promise interfaces to avoid callbacks. Note that there are transactional circumstances where this could interfere with the existing `.enqueue` and so this is a rough draft - we may need to prefix these with `asyncGet`,`asyncGetAll`, etc.

```ts
import { MyNewEntity } from '../my-file.ts';
import { Repository } from 'sourced-repo-mongo';

const repo = new Repository(MyNewEntity);
const instance = new MyNewEntity();
instance.updateSomeAttribute({ myValue: 'hello world' });

repo.commit(instance, {}, (err) => {
  // if no error then success
});
```
