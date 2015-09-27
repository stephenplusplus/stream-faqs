# stream-faqs <a href="https://twitter.com/home?status=FAQs about streams in Node.js - https://github.com/stephenplusplus/stream-faqs"><img src="https://storage.googleapis.com/gitnpm/tweet-button.png" height="20" width="47"></a>
> Let's learn these things together.

The stream learning curve has been (embarrassingly) difficult for me. But I find that the more I talk about how confused I am, the more I find people are confused, too. I've received some great help along the way, and I want to share what I've found while I continue to learn more.

When you get stuck, keep in mind:

  - The answer is almost always in the modules. The hard part is finding them and knowing what to use when
  - Your use case can probably be "re-thought of" and applied to an existing solution for a similar problem
  - You can come here to ask for help, and I'll try my best to answer or get one

## Questions

  - [How can I make a paginated API request?](#paginate)
  - [How can I destroy all of the streams in a pipeline if one gets an error?](#destroy)
  - [How can I just get all of the results when they're done coming in?](#concat)
  - [How can I asynchronously assign a stream after one has already been created?](#duplexify)
  - [How do I know when a stream is first written to or read from?](#events)
  - [What's the difference between "abort", "close", "end", "destroy", "finish", and "complete"?](#ends)
  - [Have a question?](https://github.com/stephenplusplus/stream-faqs/issues/new)

*If you find any of this information to be inaccurate or incomplete, feel free to contribute a PR!*

--

<a name="paginate"></a>
#### How can I make a paginated API request?

**Problem**

You need to pull down many results from a backend, but it limits the amount of responses you receive at a given time. You get some type of token to include with a follow up request to cursor through the results. How do you combine all of those results into one stream?

**Solutions**
  - **[See an example](https://github.com/stephenplusplus/stream-faqs/tree/master/ex-paginate)**
  - https://github.com/feross/multistream
  - https://github.com/timhudson/continue-stream
  - https://github.com/timhudson/pagination-stream
  - https://github.com/karissa/paged-http-stream

--

<a name="destroy"></a>
#### How can I destroy all of the streams in a pipeline if one gets an error?

**Problem**

You have a bunch of streams piped together and one gets an error. The other streams and any listeners on them don't really know what happened and linger around without being properly destroyed.

**Solutions**
  - **[See an example](https://github.com/stephenplusplus/stream-faqs/tree/master/ex-destroy)**
  - https://github.com/mafintosh/pump
  - https://github.com/mafintosh/pumpify

--

<a name="concat"></a>
#### How can I just get all of the results when they're done coming in?

**Problem**

You have a source readable stream but don't really want to do anything stream-y with it. Registering `.on('data')` events is a lot of boilerplate to combine the results as they come in.

**Solution**
  - **[See an example](https://github.com/stephenplusplus/stream-faqs/tree/master/ex-concat)**
  - https://github.com/maxogden/concat-stream

--

<a name="duplexify"></a>
#### How can I asynchronously assign a stream after one has already been created?

**Problem**

You want to make an API request but have to fetch an access token first. If you just call `request(/*...*/)`, you will inevitably get a 401 error, so how do you get a stream, but only have it "start" *after* you fetch an access token?

**Solution**
  - **[See an example](https://github.com/stephenplusplus/stream-faqs/tree/master/ex-async-stream)**
  - https://github.com/mafintosh/duplexify

--

<a name="events"></a>
#### How do I know when a stream is first written to or read from?

**Problem**

Since it's possible for you (or a user of your library) to create a stream, but then never connect it to anything, or not run it for an unknown amount of time, you might want to wait as long as possible to do something async.

**Solution**
  - **[See an example](https://github.com/stephenplusplus/stream-faqs/tree/master/ex-wait)**
  - https://github.com/stephenplusplus/stream-events
    - Note: works well with the [duplexify problem](#duplexify).

--

<a name="ends"></a>
#### What's the difference between "abort", "close", "end", "destroy", "finish", and "complete"?

**Problem**

There's a holy-moly-lot of events that go on with streams. How do you know which to listen to for a given stream?

**Sub-problem**

Sometimes, you won't even know what kind of stream you have. Libraries may give you combined/duplex streams, a Transform stream, or a plain old readable stream. You really have to stay close to their documentation and source code to see what you're dealing with.

**Solution**

Events   | Description
---------|------------
close    | Not always emitted. Readable streams emit this when the underlying resource is closed. Ex: a socket or a file that was "opened" to be read from.
complete | This is a custom event from [`request`](http://gitnpm.com/request) to indicate the request is completed.
end      | All readable streams emit "end" when all of the data is read from. This in turn calls the `end()` method on its destination stream, letting it know "what you have left to write is all you have to worry about, buddy".
finish   | All streams that are writable emit "finish" when all of the data has been written to their destination.

Methods        | Description
---------------|------------
abort()        | This is a method called on request streams ([`http.request`](https://nodejs.org/api/http.html#http_http_request_options_callback), [`request`](http://gitnpm.com/request)) that aborts the request.
destroy([err]) | Destroy can be called on most new, non-core streams as a less-patient version of calling `end()`. The stream will be "destroyed" without a care to any data that hasn't been processed yet. Usually, an error can be given that will be emitted to the error event for the stream.
end()          | This is a method that can be called on all streams that are writable to gracefully end the stream. Any remaining data that hasn't been written yet will be allowed to be drained. For readable streams, doing `readStream.push(null)` will end the stream and emit the `end` event.

## More Helpful Resources

- [Mississippi](https://github.com/maxogden/mississippi) - See more examples and descriptions of the most popular stream modules (many of the ones mentioned here).
