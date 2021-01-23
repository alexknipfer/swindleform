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
