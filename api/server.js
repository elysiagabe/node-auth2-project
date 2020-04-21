const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//userRouter
//authRouter
//authenticator

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//use authRouter
//use userRouter

server.get('/', (req, res) => {
    res.json({ api: 'Up and running!'})
});

module.exports = server;