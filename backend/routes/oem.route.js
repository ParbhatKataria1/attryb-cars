const express = require('express');
const { get_oem, post_oem } = require('../controller/oem.controller');
const oem = express.Router();

oem.get('/', get_oem);
oem.post('/', post_oem);

module.exports = {oem};