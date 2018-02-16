# Brandheroes app

App for Brandheroes

## Setup
The app is using [Prettier](https://github.com/prettier/prettier) for auto-formatting, as well as some ESLint presets. Also, it's using [TypeScript](https://www.typescriptlang.org/) for type safety and auto-completion. It's recommended to use plugins for both of those in your IDE for the best developer experience

### Extensions
In general, the extensions.json under ./vscode lists the recommended extensions for working with this project in VSCode. Read more about installation and extending the config [here](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)


### Expo
Furthermore, it uses the free, Open Source Expo platform for easy runtime and test-distribution. Read more and download the XDE client at https://expo.io/ 


____________________

When those are installed, simply run either of these commands depending on your package manager preference: 

* yarn
* npm i

and you should be good to go :-)

For flow-typings for Jest, run:

flow-typed install jest@20.0.4


### extensions.json
A list of recommended extensions to have installed in Visual Studio Code while working with this project

### config.json
There are three config files: 

    config.dev.json
    config.prod.json
    config.example.json

Only the example file is included in version control, the other two you must add yourself and fill out with the relevant keys. 

Use the /util/configHelper to retrieve the config relevant to your current build (prod/dev) 

# Auth flow
1. On the app, we open an URL a la 

        const query = `client_id=${clientID}&redirect_uri=${proxyRedirectUri}&response_type=code&state=${appRedirectUri}`;
        const stringURL = `https://api.instagram.com/oauth/authorize/?${query}`;


2. Our backend proxy receives the code payload on the redirect, and forwards the payload to the app using our own linking scheme (xde://localhost:190000/+/auth/instagram/code=asLKJADSAKLDJASKJLDaslkdjasljkd)
3. The app extracts the instagram code from the payload
4. Post the token to our /auth along with some other params(see Swagger) , and receive a full JWT with embedded instagram token that can be used to access both Instagram and our own services
5. The app will attempt to renew tokens before a network request if it is older than 7 minutes by posting the same full JWT to /auth/renew  . The token expires after 10 minutes. If, for some reason, a request still receives 401 back, a retry strategy is also implemented. In case of renew failure, the user is redirected to login with a 'session expired' notice

If a token has expired, a call will return  

`{error:{message:'token-expired'}}`

*The token you receive can be decoded* and contains, amongst others, the following bools: 
* isPending - the user has applied to be a brandhero, but is not yet confirmed
* isConfirmed - the user is a full-fledged brandhero

If the user is neither, he/she should be directed to the signup screen after login. 

If admin creates brandhero, both of these flags will be false - then when user signs up, it would be treated as pre-approved and would be confirmed right away

## Redirects
We are using the [Instagram explicit/server flow](https://www.instagram.com/developer/authentication/), which requires you to provide a redirect uri to the app after succesful login. However, as instagram does not accept Expo app scheme as a redirect, we instead redirect to a proxy on the backend, which in turn redirects back to the app. 

The redirect_uri param should depend on the environment you are targeting
* https://local.brandheroes.com/auth/redirect for production 
* http://develop.stage.local.brandheroes.com/auth/redirect for test (or any other branch) 

Pass along the app uri in an extra `state` param. it should be set to the url user should arrive in the end. So
`state = exp://localhost/+/auth/instagram`
or any link you want. Needs to be whitelisted by backend

after succesful login user will go to exp://localhost/+/auth/instagram/code=<code>.

## When you get your code from Instagram auth
When posting to `/auth`, pass along

`organization = 59ba95255a478501a059eeb0` , `feed = 59ba952f5a478501a059eeb1`

as hardcoded values for now

Also pass `params.app = true` in return you will get a temporary token (with temp:true in it) that can be used for signup.

You'll have to POST to `/api/feeds/<feed>/subscriptions`
and you can get feed id from `primaryFeedData` in JWT

## Flowchart for how token renewal is handled
Made with (and can be edited with)[asciiflow](http://asciiflow.com/)

                  Should token be refreshed (depending on time)?
                           +
                           |
                           |
                 Yes <-----+--------> No+----------+
                 |                                 |
                 v                                 v
       +->Refresh the token+--------------> Perform the request
       |                                                  +
       |                                                  |
       |                                                  |
       |                                                  v
       |                                            Error in request?
       |                                                  +
       ---- +                                             -----|
            No                                                 |
            ^                                        Yes <-----+-----------------> No
            |                                         +                            +
            |                                         |                            |
            +                                         |                            |
    Did you already try refreshing? <-+               v                            v
            +                          |              Is it a 401?                 You are done
            |                          +              +
            |                          Yes <----------+-------> No
            |                                                    +
            |                                                    |
            |                                                    |
            +---> Yes                                            |
                    +                                            |
                    |                                            +---->  Log and throw the exception for the operation to handle
                    |
                    |
                    v

                    Log, Navigate to login and show session expired

# Deployment of updates
Log into Expo with user nic, and publish the updated app - this will update the user's apps next time they run it in one of two ways: 
* On iPhone, the update is downloaded on app open and runs immediately. 
* On Android, the update is downloaded in the background, and the new version is loaded on next app bootup

More info can be found [here](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html)

You only need to update the binaries in the AppStores:
* If you want to change native metadata like the app’s name or icon
* If you upgrade to a newer sdkVersion of your app (which requires new native code)

# Redux
The app uses [Redux](http://redux.js.org/) for state management. 

The folder structure follows the re-ducks pattern proposed [here](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), where redux logic is separated into it's own folder, and there each feature is separated into seperate 'ducks', as proposed in [this repo](https://github.com/erikras/ducks-modular-redux). This seperates concerns and makes further development and maintenance easier due to proper feature seperation. 

The action types follow the naming convention: 
        
    [duckName]/[REQ|RES|ERR]_[ACTION]

an example being
        
    CarList/REQ_CAR_LIST

for an action in the CarList duck, dispatching a request to fetch the list. When a REQ dispatch i sent for a duck, the UI can show loading info for the user. When a SUC or ERR function is dispatched, the UI can update appropriately.

Actions in reducers have one of the following properties: 
* type - the type
* payload - the result of the request
* error - the error string, in case something went wrong

Use http://remotedev.io/local/ for time-travel debugging and state monitoring

## Checklist for adding ducks
* Add new duck folder
* Add appropriate files (types, actions, reducers, index)
* Include the new duck in the ducks/index.js file

# Tests
The project uses Jest tests with a fetch mocking library: 

https://github.com/wheresrhys/fetch-mock

Use the npm command test:watch to run impacted tests when you save files.

NOTE: At the time of writing, there are no tests for component layouts / snapshot tests, only tests for the redux store and API. If tests are added for the UI in the future, remember to remove the corresponding folders from the `collectCoverageFrom` setting in `package.json` to include them in coverage reports.

## redux-mock-store
This package is ONLY for testing that the correct actions are dispatched in operations, you cannot assert on state changes with it. For that, test the reducer itself.

https://github.com/arnaudbenard/redux-mock-store/issues/71 

# TODO
* Update docs for name conventions for ducks, as well as info on FSA

# Known issues

## App not reacting to changes?
First of all, did you compile the typescript? If so, then see below

After spending some very frustrating hours, I found out that there is a bug with Typescript (I think) that won't allow inclusion of the `__mock__` folder in the `tsconfig.json`: 

    "include": ["./src/", "./assets/images.ts"] <-- THIS WORKS
    "include": ["./src/", "./assets/images.ts", "./__mocks__/redux-mock-store.ts"] <-- THIS DOES NOT
    "include": ["./src/", "./assets/images.ts", "./__mocks__/"] <-- THIS DOESN'T EITHER

Therefore, if you need to make changes to the mock store setup for some reason, switch the outcommenting back and forth between these to create the `.js` file in `/dist`, and then back to not including it. 

If the above doesn't work, try the following chain of comands:
    watchman watch-del-all
    rm -rf ./node_modules
    npm cache clean
    yarn cache clean
    rm -rf $TMPDIR/react-*
    yarn