## The Pagination Problem

See ["How can I make a paginated API request?"](https://github.com/stephenplusplus/stream-faqs#paginate)

## The Solution

This script is going to pull down all of the users from an API. It will use the `stream-faqs` server (see [../server.js](https://github.com/stephenplusplus/stream-faqs/server.js)) to respond to a total of two requests.

Request 1: "GET /users"

Response 1: Contains 50 users in a "users" array and a `nextPageToken` property.

Request 2: "GET /users?nextPageToken={{token returned in Response 1}}"

Response 2: Contains 50 users in a "users" array *without* a `nextPageToken`.

*This mock API behaves as the Google APIs that I've been working with lately. See [gcloud-streams-test](https://github.com/stephenplusplus/gcloud-streams-test) for a complete example and analysis of memory usage.*

## Expectations

Both API requests will be made and the destination of our stream will receive an organized response containing a total of 100 users (50 users per call).

### Try It

```sh
# Start the server (if it's not running already)
$ cd stream-faqs
$ npm install
$ npm start

# Run the example
$ cd ex-paginate
$ npm install
$ node .
```
