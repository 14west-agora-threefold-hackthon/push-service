const MemDb = require('./memDbServer');

after(async function tearDown() {
  const memDb = await new MemDb();
  await memDb.cleanup();
  await memDb.stop();
});
