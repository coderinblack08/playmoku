# PlayMoku

## Setup for Contributors

Create a firebase project (enable realtime database as well as google and anonymous sign-in; copy security rules from database.rules) and enter the web app credentials into lib/`firebaseConfig.ts` to follow the structure

```ts
export const config = {
  /* ... */
};
```

Run the command to spin up next.js

```sh
yarn dev

# or...
yarn build && yarn start
```
