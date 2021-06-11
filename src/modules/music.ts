import { VoiceConnection } from 'discord.js';
import * as yts from 'yt-search';

class Song {
    id: any;
    title: string;
    url: string;

    constructor (id: any, title: string, url: string) {
        this.id = id;
        this.title = title;
        this.url = url;

        botQueue.push(this);
    }

    destroy = () => {
        botQueue.splice(botQueue.indexOf(this), 1);
    }
}

const botQueue: Song[] = [];
let botConnection: VoiceConnection;

const searchYoutube = async (args: any) => yts(args);

export {
    Song,
    botQueue,

    botConnection,
    searchYoutube
};
