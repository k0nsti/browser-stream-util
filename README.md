[![npm](https://img.shields.io/npm/v/browser-stream-util.svg)](https://www.npmjs.com/package/browser-stream-util)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![bundlejs](https://deno.bundlejs.com/?q=browser-stream-util\&badge=detailed)](https://bundlejs.com/?q=browser-stream-util)
[![downloads](http://img.shields.io/npm/dm/browser-stream-util.svg?style=flat-square)](https://npmjs.org/package/browser-stream-util)
[![GitHub Issues](https://img.shields.io/github/issues/k0nsti/browser-stream-util.svg?style=flat-square)](https://github.com/k0nsti/browser-stream-util/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fk0nsti%2Fbrowser-stream-util%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/k0nsti/browser-stream-util/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/k0nsti/browser-stream-util/badge.svg)](https://snyk.io/test/github/k0nsti/browser-stream-util)
[![Coverage Status](https://coveralls.io/repos/k0nsti/browser-stream-util/badge.svg)](https://coveralls.io/github/k0nsti/browser-stream-util)

# browser-stream-util

utility functions for web streams

*   [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [iteratorToStream](#iteratortostream)
    *   [Parameters](#parameters)
*   [stringToStream](#stringtostream)
    *   [Parameters](#parameters-1)
*   [uint8ToStream](#uint8tostream)
    *   [Parameters](#parameters-2)
*   [streamToString](#streamtostring)
    *   [Parameters](#parameters-3)
*   [streamToUint8Array](#streamtouint8array)
    *   [Parameters](#parameters-4)
*   [emptyStream](#emptystream)

## iteratorToStream

Converts an iterator into a web stream.

### Parameters

*   `iterator` **(AsyncIterator<[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)> | Iterator<[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>)**&#x20;

Returns **ReadableStream**&#x20;

## stringToStream

Encodes a string into a web stream.

### Parameters

*   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `encoder` **[TextEncoder](https://developer.mozilla.org/docs/Web/API/TextEncoder)**  (optional, default `new TextEncoder()`)

Returns **ReadableStream**&#x20;

## uint8ToStream

Encodes a uint8 array into a web stream.

### Parameters

*   `array` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)**&#x20;

Returns **ReadableStream**&#x20;

## streamToString

Reads web stream content into a string.

### Parameters

*   `stream` **ReadableStream**&#x20;
*   `decoder`   (optional, default `new TextDecoder()`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**&#x20;

## streamToUint8Array

Reads web stream content into a Uint8Array.

### Parameters

*   `stream` **ReadableStream**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>**&#x20;

## emptyStream

Delivers a zero length web stream with no data.

Returns **ReadableStream**&#x20;

# install

With [npm](http://npmjs.org) do:

```shell
npm install browser-stream-util
```

# license

BSD-2-Clause
