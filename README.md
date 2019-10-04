[![Build Status](https://travis-ci.org/xiondlph/express-promise-render-ts.svg?branch=master)](https://travis-ci.org/xiondlph/express-promise-render-ts)
[![Coverage Status](https://coveralls.io/repos/github/xiondlph/express-promise-render-ts/badge.svg?branch=master)](https://coveralls.io/github/xiondlph/express-promise-render-ts?branch=master)
# express-promise-render-ts
>A simple wrapper for express render method which allows you to receive the rendering result through promise.

This is a middleware that attaches to a response object a method, that wraps a standard `render` method and returns the result of calling the `render` method through promises, without sending it to the client.

## Install

```bash
# With npm
npm install --save express-promise-render-ts

# With yarn
yarn add express-promise-render-ts
```

## Usage
First you need to declare and mount this middleware the express `app` object.
```ts
import promiseRender from "express-promise-render-ts";

//...

app.use(promiseRender);
```

Then in your route handler you may call a `promiseRender` wrapper method like this
``` ts
app.get('/', (req: Request, res: Response) => {
  res.promiseRender("path/to/view")
    .then((html) => {
        console.info(html) // --> rendered HTML string
    })
    .catch((err) => { // rejected promise if something went wrong
        console.error(err) // --> catched error
    });
})
```

This solution will be useful if you don't want to immediately send the rendered HTML string to client, but just get it for later use. For example, as a template for sending a mail message.