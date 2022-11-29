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
 * Read stream content into a string
 * @param {ReadableStream} stream
 * @returns {string}
 */
export async function streamToString(stream, decoder = new TextDecoder()) {
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

  return decoder.decode(buffer);
}

/**
 * Delivers a stream with no data
 * @returns {ReadableStream}
 */
export function emptyStream() {
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
