import test from "ava";
import {
  iteratorToStream,
  stringToStream,
  streamToString,
  emptyStream
} from "browser-stream-util";

test("iteratorToStream", async t => {
  async function* it(chunks) {
    for (const c of chunks) {
      yield c;
    }
  }

  const stream = iteratorToStream(
    it([
      new Uint8Array([65]),
      new Uint8Array([66]),
      new Uint8Array([67]),
      new Uint8Array([68])
    ])
  );

  const buffer = await readAll(stream.getReader());

  t.deepEqual(buffer, new Uint8Array([65, 66, 67, 68]));
});

test("stringToStream", async t => {
  const stream = stringToStream("ABCD");

  const buffer = await readAll(stream.getReader());

  t.deepEqual(buffer, new Uint8Array([65, 66, 67, 68]));
});

test("streamToString", async t => {
  t.is(await streamToString(stringToStream("ABCD")), "ABCD");
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
