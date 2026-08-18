export { log }

const log = (number: number, message: string) => {
  if (number === 1) {
    console.log(`\x1b[95m[SYSTEM]>\x1b[0m ${message}`);
  } else if (number === 2) {
    console.log(`\x1b[31m[ERROR]>\x1b[0m ${message}`);
  } else if (number === 3) {
    console.log(`\x1b[33m[WARNING]>\x1b[0m ${message}`);
  } else if (number === 4) {
    console.log(`\x1b[96m[SERVER]>\x1b[0m ${message}`);
  } else if (number === 5) {
    console.log(`\x1b[94m[WEBSOCKET]>\x1b[0m ${message}`); 
  }
  
};