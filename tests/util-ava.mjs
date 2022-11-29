import test from "ava";
import { string2Stream, stream2String, emptyStream } from "browser-stream-util";

test("string2Stream", async t => {
  const stream = string2Stream("ABCD");

  const buffer = await readAll(stream.getReader());

  t.deepEqual(buffer, new Uint8Array([65, 66, 67, 68]));
});

test("stream2String", async t => {
  t.is(await stream2String(string2Stream("ABCD")), "ABCD");
});

test("emptyStream", async t => {
  const stream = emptyStream();

  const buffer = await readAll(stream.getReader());

  t.deepEqual(buffer, new Uint8Array(0));
});

async function readAll(reader) {
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
