/**
 * Converts an iterator into a ReadableStream.
 * @param {AsyncIterator<Uint8Array>|Iterator<Uint8Array>} iterator
 * @returns {ReadableStream}
 */
export function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    }
  });
}

/**
 * Encodes a string into a ReadableStream.
 * @param {string} str
 * @param {TextEncoder} [encoder]
 * @returns {ReadableStream}
 */
export function stringToStream(str, encoder = new TextEncoder()) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(str));
      controller.close();
    }
  });
}

/**
 * Encodes a uint8 array into a ReadableStream.
 * @param {Uint8Array} array
 * @returns {ReadableStream}
 */
export function uint8ToStream(array) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(array);
      controller.close();
    }
  });
}

/**
 * Reads web stream content into a string.
 * @param {ReadableStream} stream
 * @param {TextDecoder} [decoder]
 * @returns {Promise<string>}
 */
export async function streamToString(stream, decoder = new TextDecoder()) {
  return decoder.decode(await streamToUint8Array(stream));
}

/**
 * Reads web stream content into a Uint8Array.
 * @param {ReadableStream} stream
 * @param {number} maxByteLength
 * @returns {Promise<Uint8Array>}
 */
/*
export async function streamToUint8Array(
  stream,
  maxByteLength = 1024 * 1024 * 10
) {
  const reader = stream.getReader();
  const data = new ArrayBuffer(0, { maxByteLength });
  const array = new Uint8Array(data);

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const lastLength = array.length;

    data.resize(array.length + value.length);

    array.set(value, lastLength);
  }

  reader.releaseLock();

  return array;
}
*/

/**
 * Reads web stream content into a Uint8Array.
 * @param {ReadableStream} stream
 * @returns {Promise<Uint8Array>}
 */
export async function streamToUint8Array(stream) {
  const reader = stream.getReader();

  let buffer = new Uint8Array();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const newBuffer = new Uint8Array(buffer.length + value.length);
    newBuffer.set(buffer);
    newBuffer.set(value, buffer.length);
    buffer = newBuffer;
  }

  reader.releaseLock();

  return buffer;
}

/**
 * Delivers a zero length ReadableStream with no data.
 * @returns {ReadableStream}
 */
export function emptyStream() {
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
