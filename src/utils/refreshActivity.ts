import { Client } from '../../src/types/discord';
import log from '../utils/log';

const refreshActivity = async (client: Client) => {
    log(`cyan`, `Updating status...`);

    await client.user.setPresence({
        activity: {
            type: `WATCHING`,
            name: `${client.users.cache.size} members`
        },

        status: `online`
    });

    log(`green`, `Status updated.`);
};

export default refreshActivity;
