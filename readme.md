# BWS tracking app

## Environment

This is a React Native project. It uses the free, Open Source Expo platform for easy runtime and test-distribution. Read more and download the XDE client at https://expo.io/

Furthermore, it uses

* `TypeScript` + `TSLint` for static types
* `Jest` for testing
* `React-navigation` for routing
* `redux` for state management, including `redux-thunk` for async operations, and `redux-persist` for persistance of store state across app restarts.
* `Prettier` for opinionated code formatting in accordance with lint rules

### Extensions

In general, the `extensions.json` under `./vscode` lists the recommended extensions for working with this project in VSCode. Read more about installation and extending the config [here](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)

### Installing dependencies

When those are installed, simply run either of these commands depending on your package manager preference:

* yarn
* npm i

and you should be good to go :-)

The project has an existing `launch.json` that can be used to run the React Native package manger from the IDE. This allows for breakpoints and inspection in the IDE. If you prefer, you can instead opt to use the Expo XDE available from https://expo.io/ for a GUI experience rather than the CLI/VSCode

Remember to have a terminal running that watches for changes to typescript files using `tsc -w`. You should also have a terminal that runs tests using `yarn test:watch` or `npm run test:watch`

# Good to know about the template

These are some things that are good to know about the project structure if you haven't worked with it before.

## Config files

There should be three config files in your project:

    config.dev.json
    config.prod.json
    config.example.json

Only the example file is included in version control, the other two you must add yourself and fill out with the relevant keys.

Use the `/util/configHelper` to retrieve the config relevant to your current build (`prod`/`dev`) . Make sure to update the type of the expected config when you do.

## Redux

The app uses [Redux](http://redux.js.org/) for state management.

The folder structure follows the re-ducks pattern proposed [here](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), where redux logic is separated into it's own folder, and there each feature is separated into seperate 'ducks', as proposed in [this repo](https://github.com/erikras/ducks-modular-redux). This seperates concerns and makes further development and maintenance easier due to proper feature seperation.

In the template, only on duck exists, `common`. Besides being set up to handle connection changes in the app and showing the `NoConnection` banner, it also includes a dummy state that shows number of network calls. **This is only for example purposes, and can be deleted.**

The `common` state is fully typed, and future additions to the redux store should be, too!

### Flux Standard Actions

The app follows the recommended [FSA standard](https://github.com/acdlite/flux-standard-action), and the template includes a custom interface that all other actions should extend and implement. An optional, app-specific type, `IActionMeta` has also been added if the developer wants to extend the standard with his/her own fully typed meta objects.

### Purging the store

In the `store.ts` under `configureStore`, there is a section that looks like this:

```
  // Switch the comments below around to clear store
  const persistor = persistStore(store); // 1
  purgeStoredState(persistConfig); // 2
```

Comment out either one or the other line depending on what you want. If you comment out 1, the store will be purged on next run. If you comment out 2, the store is persisted. Useful when creating new ducks, deleting props of state or during store refactors.

### Checklist for adding new `ducks`

* Add new duck folder
* Add appropriate files (types, actions, reducers, index)
* Include the new duck in the `../ducks/index.ts` file

### Store migrations

The store is set up with `redux-persist`. Once the app is in use, it's important to write migrations from one store state to another if new props are added, or if props are changed/deleted to avoid nullpointers/undefined errors for the user. Migrations can be added in `migrations.ts`

### A note on selectors

Using selectors is important - think of it as the 'public api' for your views. Even the simplest of state should be exported through a selector like this:

`export const getViewState = state => state;`

and views should not directly access state, ever.

The reason is, that if (or more likely, when) the shape of the redux state eventually changes, the view logic can be unaffected if they only access it through selectors - you just update the selector logic once, and all the views are good to go! Therefore, it

1. Reduce the complexity of your reducers & components
2. Decouple the rest of your app from your state shape
3. Obey the single source of truth principle, even within your reducer

(Stolen from [here](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44))

Finally, make sure to use `reselect` for memoized selectors.

## Debugging

As React Native runs in a Javascript VM in Chrome when developing, debugging is limited to one attached thread. When debugging a React Native + redux app, this is a bit unfortunate, as debugging tools for redux and react native cannot connect to the same process at the same time.

This leave us with two choices:

* Either we use `React Native Debugger`, which allows full redux state monitoring, element inspection and on-the-fly changes - but no IDE breakpoints, or
* Use VSCode to run the VM, which allows for breakpoints in the IDE, and use the remotedev.io/local for redux inspection. The website is not too stable, sometimes it won't be up in which case you're out of luck.

To switch between the two, go to the `store.ts` file and switch the boolean flag in `getStore`.

I haven't had luck yet running the app in a packager (fx. XDE) and attaching VSCode to the process.

## Routing

The app uses `react-navigation` for routing, and it has been hooked into the redux store for time-travel debugging, as well as dispatching navigation actions from operations. Currently, the routes are contained in `routes.ts` which should be sufficient unless the app grows a lot in complexity.

## Styles

The project has a `commonStyles.ts` file that contains style elements used appwide, such as color theme, text styles for title, subtitle etc. This can be adjusted and expanded as needed, of course.

## Images object

The file `Images.ts` should be used when needing to display local image assets instead of doing inline string requires. This allows for intellisense and easier refactoring.

## AppLoading

[AppLoading](https://docs.expo.io/versions/latest/sdk/app-loading.html) has been set up to pre-download fonts, images and assets before showing the app. Adjust the desired preloads in `cachingUtils`

## Release channels

[Release Channels](https://docs.expo.io/versions/latest/guides/release-channels.html) deploy scripts have been added to `package.json`, and is implemented in the `configHelper`.

## Utility components

Two utility components are included in the template.

### NoConnection

A small connected component that listens the the network state of the app. The listeners are set up and the component included in the `AppContainer`, such that a "No network connection" banner will be shown if the app looses internet connectivity. The styling and animation properties of it can be adjusted.

### GenericErrorBoundary

This is a generic fallback component that can be used in strategic places around the app to take advantage of the `componentDidCatch` error boundaries. This can of course also be modified.

### app.json

A recommended setup of `app.json` has been done, you can read more [here](https://docs.expo.io/versions/latest/guides/configuration.html). Things of note:

* `assetBundlePatterns` - bundle local assets with binary
* `splash` - configure the loading screen
* `usesNonExemptEncryption` - Declares that the app does not use any specific encryption that Apple should know about. Short explanation [here](https://stackoverflow.com/a/36028077/1409779), and more info in Apple docs. Should be set to true if needed.
* `infoPlist.NS...` - These two strings should be customized for the app's needs

# Tests

The project uses Jest tests. Use the script `test:watch` to run impacted tests when you save files.

## Coverage

Use the script `coverage` to get a coverage report. Note that some files have been excluded from the report. The list can be modified in `package.json` under the key `collectCoverageFrom`

## Example tests

Some basic tests have been added for example's sake. Note the use of [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) which can save a lot of typing, but not all people are fans.

## On UI tests

At the time of writing, there are no tests for component layouts / snapshot tests, only tests for the redux store and API. If tests are added for the UI in the future, remember to remove the corresponding folders from the `collectCoverageFrom` setting in `package.json` to include them in coverage reports.

You can look into `Enzyme` if this becomes relevant.

Some good info can be found here
https://redux.js.org/recipes/writing-tests

## redux-mock-store

This package is ONLY for testing that the correct actions are dispatched in operations, you cannot assert on state changes with it. For that, test the reducer itself.
