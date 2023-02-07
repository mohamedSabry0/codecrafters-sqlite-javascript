import { open } from "fs/promises";

const databaseFilePath = process.argv[2];
const command = process.argv[3];

if (command === ".dbinfo") {
  const databaseFileHandler = await open(databaseFilePath, "r");

  const { buffer } = await databaseFileHandler.read({
    length: 112,
    position: 0,
    buffer: Buffer.alloc(112),
  });
  // const { pageHeader } = await databaseFileHandler.read({
  //   length: 12,
  //   position: 100,
  //   buffer: Buffer.alloc(12),
  // });
  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.log("Logs from your program will appear here!");

  // Uncomment this to pass the first stage
  const pageSize = buffer.readUInt16BE(16); // page size is 2 bytes starting at offset 16
  console.log(`database page size: ${pageSize}`);
  const numOfTables = buffer.readUInt16BE(103);
  console.log(`number of tables: ${numOfTables}`);
  console.log(buffer.readUInt16BE(100));
} else {
  throw `Unknown command ${command}`;
}
