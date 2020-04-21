const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');
const authenticator = require('../auth/authenticator');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', authenticator, userRouter);
server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.json({ api: 'Up and running!'})
});

module.exports = server;