'use babel';

import Provider from './provider.js';

export default {
    config: {
        nbPropositions: {
            type: 'integer',
            default: 8,
            minimum: 1,
            maximum: 20
        },
        autoCompleteWord: {
            type: 'string',
            default: 'cp',
        }
    },
    provide() {
        const Provider = require('./provider');
        this.provider = new Provider();
        return this.provider;
    }
};
