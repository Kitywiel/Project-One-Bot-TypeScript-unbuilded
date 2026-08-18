export { log };

const log = ( number: number, message: string) => {
  if (number === 1) {
    console.log(`\x1b[35m[ONE BOT]>\x1b[0m ${message}`);

  } else if (number === 2) {
    console.log(`\x1b[31m[ERROR]>\x1b[0m ${message}`);

  } else if (number === 3) {
    console.log(`\x1b[33m[WARNING]>\x1b[0m ${message}`);

  } else if (number === 4) {
    console.log(`\x1b[34m[MESSAGE]>\x1b[0m ${message}`);

  } else if (number === 5) {
  console.log(`\x1b[36m[INFO]>\x1b[0m ${message}`);

  } else if (number === 6) {
    console.log(`\x1b[32m[SUCCESS]>\x1b[0m ${message}`);

  } else if (number === 7) {
    console.log(`\x1b[34m[PACKET]>\x1b[0m ${message}`);
  }
};