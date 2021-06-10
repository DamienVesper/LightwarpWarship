import { Client } from '../types/discord';
import config from '../../config/config';

import log from '../utils/log';
import { logHeader } from '../utils/logExtra';

import refreshActivity from '../utils/refreshActivity';

export default async (client: Client) => {
    log(`green`, `Client has started, with ${client.users.cache.size} user(s) in ${client.guilds.cache.size} guild(s).`);

    logHeader(() => {
        refreshActivity(client, () => {
            setInterval(() => refreshActivity(client), config.cooldowns.utils.refreshActivity);
        });
    });
};
