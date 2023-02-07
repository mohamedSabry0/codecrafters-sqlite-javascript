import { open } from "fs/promises";

const databaseFilePath = process.argv[2];
const command = process.argv[3];

if (command === ".dbinfo") {
  const databaseFileHandler = await open(databaseFilePath, "r");

  const { DBHeader } = await databaseFileHandler.read({
    length: 100,
    position: 0,
    buffer: Buffer.alloc(100),
  });
  const { pageHeader } = await databaseFileHandler.read({
    length: 12,
    position: 100,
    buffer: Buffer.alloc(12),
  });
  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.log("Logs from your program will appear here!");

  // Uncomment this to pass the first stage
  const pageSize = DBHeader.readUInt16BE(16); // page size is 2 bytes starting at offset 16
  console.log(`database page size: ${pageSize}`);
  const numOfTables = pageHeader.readUInt16BE(3);
  console.log(`number of tables: ${numOfTables}`);
  console.log(pageHeader.readUInt16BE(0));
} else {
  throw `Unknown command ${command}`;
}
