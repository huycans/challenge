'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');
const path = require("path");
const cors = require("cors");

// server config
const port = process.env.PORT || 3000;

// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve();
        });
        app.use(cors());
        app.use(express.static(path.resolve(__dirname, '../public')));
        app.get('/', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`);
    });
};

module.exports = start;


