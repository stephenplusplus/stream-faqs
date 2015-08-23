## The Async Stream Problem

See ["How can I asynchronously assign a stream after one has already been created?"](https://github.com/stephenplusplus/stream-faqs#duplexify)

## The Solution

We will develop a function called `makeRequest` that returns a [Duplexify](https://github.com/mafintosh/duplexify) stream. At the same time we make the stream, we make a request to get an authorization token.

## Expectations

The function will return a stream that performs as a normal request stream would, except we are able to make an async API request in front of it without even noticing.

### Try It

```sh
# Start the server (if it's not running already)
$ cd stream-faqs
$ npm install
$ npm start

# Run the example
$ cd ex-async-assign
$ npm install
$ node .
```
