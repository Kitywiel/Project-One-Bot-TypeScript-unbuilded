export {bot, dotenv};
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.HOST ?? '127.0.0.1',
  username: process.env.USERNAME ?? 'Bot',
  auth: process.env.AUTH ?? 'offline',
  port: process.env.PORT,
  version: process.env.VERSION
});
