const express = require('express');
const { get_inventory, post_inventory, update_inventory, delete_inventory } = require('../controller/inventory.controller');

const inventory = express.Router();

inventory.get('/', get_inventory);
inventory.post('/', post_inventory);
inventory.patch('/', update_inventory);
inventory.delete('/', delete_inventory);
// inventory.post('/up', temp);

module.exports  = {inventory};