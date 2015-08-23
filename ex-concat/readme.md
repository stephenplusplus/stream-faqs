## The Manual Concatenation Problem

See ["How can I just get all of the results when they're done coming in?"](https://github.com/stephenplusplus/stream-faqs#concat)

## The Solution

[concat-stream](https://github.com/maxogden/concat-stream) will collect all of the data as it comes in and return it to us in a single callback once the stream has ended.

## Expectations

The stream will run without us listening for a "data" event, and will return the entire response body to us.

### Try It

```sh
# Start the server (if it's not running already)
$ cd stream-faqs
$ npm install
$ npm start

# Run the example
$ cd ex-concat
$ npm install
$ node .
```
