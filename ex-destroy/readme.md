## The Destroy Problem

See ["How can I destroy all of the streams in a pipeline if one gets an error?"](https://github.com/stephenplusplus/stream-faqs#destroy)

## The Solution

[pumpify](https://gitnpm.com/pumpify) to the rescue. Instead of piping your streams together manually, you give them all to `pumpify`. It will register listeners for all of the various end/close/error events that are appropriate for the type of streams you give it, and if one triggers, it will go through the rest of the streams ahead of it and properly destroy them.

Say you're downloading a file with request (`readableRequestStream`) and uploading it somewhere else (`writableRequestStream`). When you give both streams to pumpify, it will listen for when each stream ends. If `readableRequestStream` ends with an error, it will call `writableRequestStream.abort`, which is the appropriate destruction method for a request stream.

## Expectations

`request('http://does-not-exist')` should fail with an `ENOTFOUND` error. This should abort the connected, writable stream.

### Try It

```sh
# Start the server (if it's not running already)
$ cd stream-faqs
$ npm install
$ npm start

# Run the example
$ cd ex-destroy
$ npm install
$ node .
```
