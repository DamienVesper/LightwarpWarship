import * as Discord from 'discord.js';
import { Client } from '../types/discord';

import config from '../../config/config';

import log from '../utils/log';
import oChat from '../utils/oChat';

export default async (client: Client, message: Discord.Message) => {
    const m = `${message.author} »`;

    if ((message.channel as Discord.TextChannel).name === `o-chat`) oChat(client, message);

    // Botception and prefix handling.
    if (message.author.bot || message.channel.type === `dm`) return;
    if (message.content.slice(0, config.prefix.length).toString().toLowerCase() !== config.prefix) return;

    // Parse arguments and command.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command from the handler.
    const cmd = client.commands.find(cmd => cmd.name === command || (cmd.config.aliases && cmd.config.aliases.includes(command)));
    if (!cmd) return;

    if ((cmd.config.usage) && args.length < (cmd.config.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.config.usage}\`.`);

    // Start typing.
    message.channel.startTyping();

    // Execute the command.
    log(`magenta`, `${message.author.tag} [${message.author.id}] ran command ${cmd.name} in ${message.guild.name}.`);
    await cmd.run(client, message, args);

    // Stop typing.
    message.channel.stopTyping(true);
};
