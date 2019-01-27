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

it("dir not exist", async () => {
  let out = await buildr({}, path.join(stub, "shadow"));
  await expect(out).toMatch(/^ENOENT/);
});

it("dir exist but no content to index", async () => {
  let dir = path.join(stub, "empty");
  fs.mkdirSync(dir);
  let out = await buildr({}, dir);
  await expect(out).toMatch(/^No/);
});

it("dir exist and normal", async () => {
  let out = await buildr({}, stub);
  await expect(out).toMatch(/precached/);
});
