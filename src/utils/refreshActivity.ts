import { Client } from '../../src/types/discord';
import log from '../utils/log';

const refreshActivity = async (client: Client, callback?: any) => {
    log(`cyan`, `Updating status...`);

    await client.user.setPresence({
        activity: {
            type: `WATCHING`,
            name: `${client.users.cache.size} servers`
        },

        status: `online`
    });

    log(`green`, `Status updated.`);
    if (callback !== undefined) callback();
};

export default refreshActivity;
