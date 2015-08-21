# stream-faqs
> Let's learn these things together.

The stream learning curve has been (embarrassingly) difficult for me. But I find that the more I talk about how confused I am, the more I find people are confused, too. I've received some great help along the way, and I want to share what I've found while I continue to learn more.

When you get stuck, keep in mind:

  - The answer is almost always in the modules. The hard part is finding them and knowing what to use when
  - Your use case can probably be "re-thought of" and applied to an existing solution for a similar problem
  - You can come here to ask for help, and I'll try my best to answer or get one

#### [Have a question?](https://github.com/stephenplusplus/stream-faqs/issues/new)

*If you find any of this information to be inaccurate or incomplete, feel free to contribute a PR!*

#### How can I make a paginated API request?

**Problem**

You need to pull down many results from a backend, but it limits the amount of responses you receive at a given time. You get some type of token to include with a follow up request to cursor through the results. How do you combine all of those results into one stream?

**Solutions**
  - https://github.com/feross/multistream
  - https://github.com/timhudson/continue-stream
  - https://github.com/timhudson/pagination-stream

#### How can I destroy all of the streams in a pipeline if one gets an error?

**Problem**

You have a bunch of streams piped together and one gets an error. The other streams and any listeners on them don't really know what happened and linger around without being properly destroyed.

**Solutions**
  - https://github.com/mafintosh/pump
  - https://github.com/mafintosh/pumpify
