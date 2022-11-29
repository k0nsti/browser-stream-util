/**
 * Encodes a string into a stream.
 * @param {string} str
 * @param {TextEncoder} encoder
 * @returns {ReadableStream}
 */
export function string2Stream(str, encoder = new TextEncoder()) {
  return new ReadableStream({
    async pull(controller) {
      controller.enqueue(encoder.encode(str));
      controller.close();
    }
  });
}

/**
 * Read stream content into a string
 * @param {*} stream
 * @returns {string}
 */
export async function stream2String(stream, decoder = new TextDecoder()) {
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
    async pull(controller) {
      controller.close();
    }
  });
}
