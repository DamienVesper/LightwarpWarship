import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import config from '../../../config/config';
import * as musicUtil from '../../modules/music';

import ytdl from 'ytdl-core';

const cmd: CommandConfig = {
    desc: `Play a song.`,
    category: `music`,
    usage: `<song>`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send(`${m} You need to be in a voice channel to run this command!`);
    if (client.music.connection && (await message.guild.members.fetch(client.user.id)).voice.channel.id !== voiceChannel.id) return message.channel.send(`${m} You must be in the same channel as the bot to run this command!`);

    const perms = voiceChannel.permissionsFor(message.client.user);
    if (!perms.has(`CONNECT`) || !perms.has(`SPEAK`)) return message.channel.send(`${m} I can't connect to that voice channel!`);

    let songInfo: any;

    if (ytdl.validateURL(args.join(` `))) songInfo = await ytdl.getInfo(args[0]);
    else {
        const searchResults = await musicUtil.searchYoutube(args.join(` `));
        songInfo = await ytdl.getInfo(searchResults.videos[0].url);
    }

    const song = new musicUtil.Song(songInfo.videoDetails.id, songInfo.videoDetails.title, songInfo.videoDetails.video_url);

    const queueAddEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Added to Queue!`)
        .setDescription(`\`${song.title}\``)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.channel.send(queueAddEmbed);

    message.member.voice.channel.join().then(connection => {
        client.music.connection = connection;

        try {
            if (client.music.queue.length === 1) play(client.music.queue[0]);
        } catch (err) {
            // Destroy the queue and connection.
            client.music.queue.splice(0, client.music.queue.length);
            client.music.connection = null;

            // Leave the channel.
            voiceChannel.leave();
        }
    });

    const play = async (song: musicUtil.Song) => {
        client.music.connection.play(ytdl(song.url))
            .on(`end`, () => {
                client.music.queue.shift();
                play(client.music.queue[0]);
            });

        const playingEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.green)
            .setAuthor(`Started playing: ${song.title}`)
            .setDescription(song.url)
            .setTimestamp(new Date())
            .setFooter(config.footer);

        message.channel.send(playingEmbed);
    };
};

export {
    cmd,
    run
};
