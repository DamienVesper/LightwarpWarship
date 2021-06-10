import { Client } from '../types/discord';
import * as Discord from 'discord.js';

const deleteMessage = (message: Discord.Message, notification: string) => {
    message.author.send(notification).catch(() => {});
    message.delete();
};

const oChat = (client: Client, message: Discord.Message) => {
    if (message.content !== `o`) deleteMessage(message, `You may only send an \`o\` in the \`o-chat\`.`);

    message.channel.messages.fetch({ limit: 1 }).then((msgs) => {
        const msg = msgs.first();

        if (msg.author.id === message.author.id) deleteMessage(message, `You cannot send a message after you already have!`);
    });
};

export default oChat;