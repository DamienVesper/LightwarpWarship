import * as Discord from 'discord.js';

import { Client, CommandConfig } from '../../types/discord';
import randomInt from '../../utils/randomInt';

const eightBallEmote = `\uD83C\uDFB1`;

const cmd: CommandConfig = {
    desc: `Ask the 8ball anything ${eightBallEmote}!`,
    category: `fun`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    const eightBallResponses: string[] = [`It is certain.`, `It is decidedly so.`, `Without a doubt.`, `Yes - definitely.`, `You may rely on it.`, `As I see it, yes.`, `Most likely.`, `Outlook good.`, `Yes.`, `Signs point to yes.`, `Reply hazy, try again.`, `Ask again later.`, `Better not tell you now.`, `Cannot predict now.`, `Concentrate and ask again.`, `Don't count on it.`, `My reply is no.`, `My sources say no.`, `Outlook not so good.`, `Very doubtful.`];

    message.channel.send(`${m} ${eightBallEmote} ${eightBallResponses[randomInt(0, eightBallResponses.length - 1)]}`);
};

export {
    cmd,
    run
};
