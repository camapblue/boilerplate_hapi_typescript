// no type definitions available for expose-gc. Hence require
const garbageCollector = require("expose-gc/function");
afterEach(() => {
  expect.hasAssertions();
});
beforeAll(() => {
  // to do
});
afterAll(() => {
  try {
    garbageCollector();
  } catch {}
});
