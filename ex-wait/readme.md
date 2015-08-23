## The Wait Until the Stream Is Ready Problem

See ["How do I know when a stream is first written to or read from?"](https://github.com/stephenplusplus/stream-faqs#events)

## The Solution

This example will use the same code from [ex-async-stream](https://github.com/stephenplusplus/tree/master/ex-async-stream), as that is a perfect use case for this problem.

Imagine you were designing a library that lets users make requests to your API. Before every request you make on behalf of the user, you need to make sure a fresh access token is included.

The key word is *fresh*. An access token can expire at any time. It's even possible that it expires between the time the user got a stream from your library and actually started pulling data out of it.

To help solve for this, we can wait until we know the stream is being used before we go and get an access token.

## Expectations

The stream will wait for us to start reading from it before getting a token.

### Try It

```sh
# Start the server (if it's not running already)
$ cd stream-faqs
$ npm install
$ npm start

# Run the example
$ cd ex-wait
$ npm install
$ node .
```
