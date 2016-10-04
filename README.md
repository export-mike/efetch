#f-etag
A thin wrapper around fetch api, we use `isomorphic-fetch` to allow this to work in a node environment.
For a given 200 response with an Etag header we resolve the promise for the current request and clone
response and store it in an in memory cache. For a 304 response with a matching ETag header we resolve the same
response object from the previous 200 response.

## Why etag caching?
They're a pain to deal with having to check for 304 and deal with the caching strategy yourself, this is not designed to work between refreshes in the browser. This library is aimed towards browser usage. but its not setup between browser refreshes? yes this is a requirement of an existing project but by all means plugin a caching strategy somehow in a PR.

#install:
  `npm i --save f-etag`

#Usage:

``` Javascript
  import eFetch from 'f-etag';
  // use eFetch like the normal fetch api.
```
