const MemDb = require('./memDbServer');

before(async function tearUp() {
  const memDb = await new MemDb();
  await memDb.start();
});
