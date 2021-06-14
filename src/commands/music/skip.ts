import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Skip a song.`,
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send(`${m} You need to be in a voice channel to run this command!`);
    if (client.music.connection && (await message.guild.members.fetch(client.user.id)).voice.channel.id !== voiceChannel.id) return message.channel.send(`${m} You must be in the same channel as the bot to run this command!`);
    if (client.music.queue.length === 0) return message.channel.send(`${m} There aren't any songs to skip!`);

    client.music.connection.dispatcher.end();
    client.music.queue.shift();
    message.channel.send(`${m} Skipped song.`);
};

export {
    cmd,
    run
};
