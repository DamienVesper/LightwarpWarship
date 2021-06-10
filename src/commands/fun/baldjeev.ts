import * as Discord from 'discord.js';
import * as path from 'path';

import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Rajeev...but bald?`,
    category: `fun`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    message.channel.send(`${m} He returns...`, { files: [path.resolve(__dirname, `../../../../assets/img/baldjeev.png`)] });
};

export {
    cmd,
    run
};
