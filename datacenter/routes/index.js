'use strict';

const express      = require('express');
const createRouter = require('../tools/create-router');
const validator    = require('../middlewares/param-validator');

const router = module.exports = express.Router();

const v1Web   = createRouter(path.join(__dirname, 'v1/web'));
const v1Admin = createRouter(path.join(__dirname, 'v1/admin'));

validator(router);

router.use('/api/v1', v1Web);
router.use('/adminapi/v1', v1Admin);
