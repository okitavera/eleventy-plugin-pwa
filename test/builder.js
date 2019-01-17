import fs from "fs";
import rimraf from "rimraf";
import path from "path";
import it from "ava";
import sinon from "sinon";
import buildr from "../src/builder";

const stub = "test/stub";

it.after((t) => {
  let opt = { glob: true };
  fs.readdirSync(stub).forEach((i) => {
    if (!i.match(/^index.*/g)) {
      rimraf.sync(path.join(stub, i), opt);
    }
  });
});

it.beforeEach((t) => {
  t.context.log = console.log;
  t.context.error = console.error;
  console.log = sinon.spy();
  console.error = sinon.spy();
});

it.afterEach((t) => {
  console.log = t.context.log;
  console.error = t.context.error;
});

it("dir not exist", (t) => {
  buildr({}, path.join(stub, "shadow"));
  t.true(console.error.called);
});

it("dir exist but no content to index", (t) => {
  let dir = path.join(stub, "empty");
  fs.mkdirSync(dir);
  buildr({}, dir);
  t.true(console.error.called);
});

it("dir exist and normal", async (t) => {
  await buildr({}, "./test/stub");
  await t.true(console.log.called);
});
