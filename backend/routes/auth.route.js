const express = require('express');
const { login_controller, sign_controller } = require('../controller/auth.controller');

const auth = express.Router();

auth.post('/signup', sign_controller);

auth.post('/login', login_controller);

module.exports = {auth};