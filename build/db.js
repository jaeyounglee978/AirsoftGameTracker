"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const Knex = require("knex");
const MockKnex = require("mock-knex");
const config = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
exports.knex = Knex(config[env]);
if (env === 'test') {
    MockKnex.mock(exports.knex);
}
exports.default = require('bookshelf')('knex');
