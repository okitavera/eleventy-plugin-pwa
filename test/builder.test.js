const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const buildr = require("../src/builder");
const stub = "test/stub";

afterAll(() => {
  let opt = { glob: true };
  fs.readdirSync(stub).forEach((i) => {
    if (!i.match(/^index.*/g)) {
      rimraf.sync(path.join(stub, i), opt);
    }
  });
});

let spyError;
let spyLog;

beforeEach(() => {
  spyError = jest.spyOn(console, "error");
  spyLog = jest.spyOn(console, "log");
});

afterEach(() => {
  spyError.mockRestore();
  spyLog.mockRestore();
});

it("dir not exist", () => {
  buildr({}, path.join(stub, "shadow"));
  expect(spyError).toBeCalled();
});

it("dir exist but no content to index", () => {
  let dir = path.join(stub, "empty");
  fs.mkdirSync(dir);
  buildr({}, dir);
  expect(spyError).toBeCalled();
});

it("dir exist and normal", async () => {
  await buildr({}, stub);
  await expect(spyLog).toBeCalled();
});
