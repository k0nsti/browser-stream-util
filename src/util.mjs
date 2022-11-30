
/**
 * Converts an iterator into a stream.
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
    },
  });
}

/**
 * Encodes a string into a stream.
 * @param {string} str
 * @param {TextEncoder} encoder
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
 * Read stream content into a string.
 * @param {ReadableStream} stream
 * @returns {string}
 */
export async function streamToString(stream, decoder = new TextDecoder()) {
  return decoder.decode(await streamToUint8Array(stream));
}

/**
 * Read stream content into a Uint8Array.
 * @param {ReadableStream} stream
 * @returns {Uint8Array}
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

  return buffer;
}

/**
 * Delivers a zero length stream with no data.
 * @returns {ReadableStream}
 */
export function emptyStream() {
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
