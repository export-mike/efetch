import fetch from 'isomorphic-fetch'
const data = {}
const etags = {}

module.export = (url = null, options = { headers: {} }, skipExtraHeader = false) => {
  /* eslint no-param-reassign:0 */
  url = url ? url : options.url
  if (options.method === 'GET' || !options.method) {
    const etag = etags[url]
    const cachedResponse = data[`${url}${etag}`] // ensure etag is for url
    if (etag) {
      options.headers['If-None-Match'] = etag
    }

    if (!skipExtraHeader) {
      options.headers['Access-Control-Expose-Headers'] = 'ETag';
    }

    return fetch(url, options)
    .then((response) => {
      if (response.status === 304) {
        return cachedResponse.clone()
      }

      if (response.status === 200) {
        const responseEtag = response.headers.get('Etag')

        if (responseEtag) {
          data[`${url}${responseEtag}`] = response.clone()
          etags[url] = responseEtag
        }
      }

      return response
    })

  }
  // all other requests go straight to fetch
  // can't use apply(undefined, arguments) as babel uses _arguments which is different..
  return fetch.call(undefined, url, options)
}
