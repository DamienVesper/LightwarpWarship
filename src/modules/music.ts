import yts from 'yt-search';

import client from '../index';

class Song {
    id: any;
    title: string;
    url: string;

    constructor (id: any, title: string, url: string) {
        this.id = id;
        this.title = title;
        this.url = url;

        client.music.queue.push(this);
    }

    destroy = () => {
        client.music.queue.splice(client.music.queue.indexOf(this), 1);
    }
}

const searchYoutube = async (args: any) => yts(args);

export {
    Song,
    searchYoutube
};
