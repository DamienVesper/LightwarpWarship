import { version } from '../package.json';

import colors from './colors';
import cooldowns from './cooldowns';
import * as embeds from './embeds';

const config = {
    colors,
    cooldowns,
    embeds,

    prefix: `l.`,

    version,
    footer: `© LightWarp Network | v${version}`
};

export default config;
