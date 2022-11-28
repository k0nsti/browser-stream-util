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
