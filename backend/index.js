const express = require('express');
const { connection } = require('./db');
const app = express();
const cors = require('cors');
const { auth } = require('./routes/auth.route');
const { oem } = require('./routes/oem.route');
const { inventory } = require('./routes/inventory.route');
const { auth_middleware } = require('./middleware/auth.middleware');
require('dotenv').config();

app.use(express.json());
app.use(cors("*"));

app.use('/auth', auth);
app.use(auth_middleware);
app.use('/oem', oem);
app.use('/inventory', inventory);


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log(`server is running on port number ${process.env.port}`)
    } catch (error) {
        console.log('server is not running')
    }
})