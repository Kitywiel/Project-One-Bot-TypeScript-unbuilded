
import { bot, } from "./handeler/bot-handeler";
import { log } from "./handeler/consle-log-handeler";
import { crackedLoginHandler } from "./handeler/bot-cracked-login-handler";


  log(1, 'Starting the bot...');
  
  if ((process.env.AUTH ?? 'offline') === 'offline') {
    log(5, 'Bot is in offline mode');
    if (process.env.CRACKED_PASSWORD) {
      log(5, 'Cracked password is set.');
      
    } else {  
      log(3, 'Cracked password is not set. Bot might not be able to connect to the server.');

    }
    bot.on('connect', () => {
      log(6, 'Bot connected to the server.');
      crackedLoginHandler(bot);
    });
    bot.on('error', (err: any) => {
      log(2, `Bot encountered an error: ${err.message}`);
    });
    bot.on('end', () => {
      log(2, 'Bot disconnected from the server.');
    });
    bot.on('kicked', (reason: any) => {
      log(2, `Bot was kicked from the server. Reason: ${reason}`);
    });
  }
  

