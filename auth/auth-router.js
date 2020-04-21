const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');
const secrets = require('../api/secrets');

// ~~ ENDPOINTS ~~ //
// Register account
router.post('/register', (req, res) => {
    let newAcct = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(newAcct.password, rounds);
    newAcct.password = hash;

    Users.add(newAcct)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err.message })
        })
})

module.exports = router;