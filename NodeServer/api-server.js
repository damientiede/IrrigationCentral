#!/usr/bin/env node

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//make sure the database is seeded
const seedAll = require('./server/seeders').seedAll;
seedAll();

const api = express();

api.use(logger('dev'));
api.use(cors());

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(api);
api.get('*', (req, res) => res.status(200).send({
	message: 'Welcome hahaha'
}));


module.exports = api;
