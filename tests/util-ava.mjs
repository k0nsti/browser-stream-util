import test from "ava";
import {
  iteratorToStream,
  stringToStream,
  streamToString,
  streamToUint8Array,
  emptyStream
} from "browser-stream-util";

function* it(chunks) {
  for (const c of chunks) {
    yield c;
  }
}

test("iteratorToStream async", async t => {
  const stream = iteratorToStream(
    it([
      new Uint8Array([65]),
      new Uint8Array([66]),
      new Uint8Array([67]),
      new Uint8Array([68])
    ])
  );

  t.deepEqual(
    await streamToUint8Array(stream),
    new Uint8Array([65, 66, 67, 68])
  );
});

test("iteratorToStream", async t => {
  const stream = iteratorToStream(
    it([
      new Uint8Array([65]),
      new Uint8Array([66]),
      new Uint8Array([67]),
      new Uint8Array([68])
    ])
  );

  t.deepEqual(
    await streamToUint8Array(stream),
    new Uint8Array([65, 66, 67, 68])
  );
});

test("stringToStream", async t => {
  const stream = stringToStream("ABCD");

  const buffer = await streamToUint8Array(stream);

  t.deepEqual(buffer, new Uint8Array([65, 66, 67, 68]));
});

test("streamToString", async t => {
  t.is(await streamToString(stringToStream("ABCD")), "ABCD");
});

test("emptyStream", async t => {
  t.deepEqual(await streamToUint8Array(emptyStream()), new Uint8Array(0));
});
