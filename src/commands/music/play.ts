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
    if (!voiceChannel) return message.channel.send(`${m} You need to be in a voice channel to play a song!`);

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
        .setAuthor(`\`${song.title}\` has been added to the queue!`)
        .setDescription(song.url)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.channel.send(queueAddEmbed);

    const play = async (song: musicUtil.Song) => {
        musicUtil.botConnection.play(ytdl(song.url))
            .on(`end`, () => {
                musicUtil.botQueue.shift();
                play(musicUtil.botQueue[0]);
            });

        const playingEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.green)
            .setAuthor(`Started playing: ${song.title}`)
            .setDescription(song.url)
            .setTimestamp(new Date())
            .setFooter(config.footer);

        message.channel.send(playingEmbed);
    };

    try {
        play(musicUtil.botQueue[0]);
    } catch (err) {
        musicUtil.botQueue.splice(0, musicUtil.botQueue.length);
        voiceChannel.leave();
    }
};

export {
    cmd,
    run
};
