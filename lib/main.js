'use babel';

import Provider from './provider.js';

export default {
    provide() {
        const Provider = require('./provider');
        this.provider = new Provider();
        return this.provider;
    }
};
