# stream-faqs <a href="https://twitter.com/home?status=FAQs about streams in Node.js - https://github.com/stephenplusplus/stream-faqs"><img src="https://storage.googleapis.com/gitnpm/tweet-button.png" height="20" width="47"></a>
> Let's learn these things together.

The stream learning curve has been (embarrassingly) difficult for me. But I find that the more I talk about how confused I am, the more I find people are confused, too. I've received some great help along the way, and I want to share what I've found while I continue to learn more.

When you get stuck, keep in mind:

  - The answer is almost always in the modules. The hard part is finding them and knowing what to use when
  - Your use case can probably be "re-thought of" and applied to an existing solution for a similar problem
  - You can come here to ask for help, and I'll try my best to answer or get one

#### [Have a question?](https://github.com/stephenplusplus/stream-faqs/issues/new)

*If you find any of this information to be inaccurate or incomplete, feel free to contribute a PR!*

--

<a name="paginate"></a>
#### How can I make a paginated API request?

**Problem**

You need to pull down many results from a backend, but it limits the amount of responses you receive at a given time. You get some type of token to include with a follow up request to cursor through the results. How do you combine all of those results into one stream?

**Solutions**
  - https://github.com/feross/multistream
  - https://github.com/timhudson/continue-stream
  - https://github.com/timhudson/pagination-stream

--

<a name="destroy"></a>
#### How can I destroy all of the streams in a pipeline if one gets an error?

**Problem**

You have a bunch of streams piped together and one gets an error. The other streams and any listeners on them don't really know what happened and linger around without being properly destroyed.

**Solutions**
  - https://github.com/mafintosh/pump
  - https://github.com/mafintosh/pumpify

--

<a name="concat"></a>
#### How can I just get all of the results when they're done coming in?

**Problem**

You have a source readable stream but don't really want to do anything stream-y with it. Registering `.on('data')` events is a lot of boilerplate to combine the results as they come in.

**Solution**
  - https://github.com/maxogden/concat-stream

--

<a name="duplexify"></a>
#### How can I asynchronously assign a stream after one has already been created?

**Problem**

You want to make an API request but have to fetch an access token first. If you just call `request(/*...*/)`, you will inevitably get a 401 error, so how do you get a stream, but only have it "start" *after* you fetch an access token?

**Solution**
  - https://github.com/mafintosh/duplexify

--

<a name="events"></a>
#### How do I know when a stream is first written to or read from?

**Problem**

Since it's possible for you (or a user of your library) to create a stream, but then never connect it to anything, or not run it for an unknown amount of time, you might want to wait as long as possible to do something async.

**Solution**
  - https://github.com/stephenplusplus/stream-events
    - Note: works well with the [duplexify problem](#duplexify).
