import * as Discord from 'discord.js';
import mongoose from 'mongoose';

import { Client } from './types/discord';
import log from './utils/log';

import * as logExtra from './utils/logExtra';
import * as loader from './utils/loader';

import * as dotenv from 'dotenv';
dotenv.config();

const client: Client = new Discord.Client({
    disableMentions: `everyone`,
    fetchAllMembers: true
});

// Uncaught exception handler.
process.on(`uncaughtException`, e => log(`red`, e.stack));

// Bot startup.
const startBot = async () => {
    logExtra.logSplash();

    await loader.loadCommands(client);
    await loader.loadEvents(client);

    client.music = {
        connection: null,
        queue: []
    };

    logExtra.logHeader();
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    log(`green`, `Connected to database.`);

    logExtra.logHeader();
    await client.login(process.env.DISCORD_TOKEN).catch(() => log(`red`, `Failed to authenticate client with application.`));
};

// Actually start the bot.
startBot();

export default client;
