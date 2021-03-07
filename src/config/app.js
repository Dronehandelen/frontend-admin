import getEnv from '../helpers/getEnv.js';

const appConfig = {
    appName: 'Dronehandelen',
    apiUrl: getEnv('REACT_APP_API_URL', 'https://api.local.dronehandelen.no'),
    sentryUrl: getEnv('REACT_APP_SENTRY', null),
    releaseHash: getEnv('REACT_APP_RELEASE_HASH', null),
    releaseDate: getEnv('REACT_APP_RELEASE_DATE', 'dev'),
    environment: getEnv('NODE_ENV', 'development'),
    productTypes: {
        PRODUCT: 'product',
        PACKAGE: 'package',
    },
    deliveryTypes: {
        GET_SELF: 'get_self',
        BRING: 'bring',
        BRING_PIP: '3584',
        BRING_SP: '5800',
    },
};

export default appConfig;
