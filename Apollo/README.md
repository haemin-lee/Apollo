# Apollo

This is the React Native code.

### Prerequisites

-   React Native
-   XCode

### Running

Install the node modules

```
$ npm i
```

Due to Metro not supporting symlinks, we need to copy the API clients over to the `node_modules/` directory. For development purposes, consider using a tool like [WML](https://github.com/wix/wml)

```
$ cp -r ../apollo-api-client node_modules/
```

Install the Pods

```
$ npx pod-install ios
```

Due to React Native not supporting `.env` files, create a file under `src/api/endpoint.js` with the following content

```js
export default '<your Apollo server url here>'
```

**Simulator**

Run the app

```
$ npx react-native run-ios
```

**Device**

Open the XCode project under `ios/Apollo.xcworkspace`

Click the Run button
