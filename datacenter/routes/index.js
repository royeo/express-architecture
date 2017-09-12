'use strict';

const express      = require('express');
const createRouter = require('../tools/create-router');

const router = express.Router();

const v1Web   = createRouter(path.join(__dirname, 'v1/web'));
const v1Admin = createRouter(path.join(__dirname, 'v1/admin'));

router.use('/api/v1', v1Web);
router.use('/adminapi/v1', v1Admin);

module.exports = router;
