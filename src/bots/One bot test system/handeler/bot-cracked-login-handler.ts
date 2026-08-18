import { log } from "./consle-log-handeler";

export {crackedLoginHandler}

const crackedLoginHandler = (bot: any) => {
  log(5, 'Cracked login handler is active.');
  if (process.env.HOST == '10b10t.com') {
    log(5, 'stoping the bot from falling because it is on 10b10t.com');
    bot._client.on('packet', (data: any, meta: any) => {
    if (
        meta.name === 'position' ||
        meta.name === 'position_look'
    ) {
        log(5, `Server position: ${JSON.stringify(data)}`);
    }
});
    bot.on('message', (message: any) => {
      log(4 , `${message.toString()}`);
    });
    bot.on('packet', (packet: any) => {
      log(7, `${JSON.stringify(packet)}`);
    });
    bot._client.write()
  }
};
