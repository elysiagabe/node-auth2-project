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

// Login authorizaiton & token generation
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user[0].password)) {
                const token = generateToken(user);
                res.status(200).json({ message: 'Welcome!', token })
            } else {
                res.status(401).json({ message: "You shall not pass!" })
            }
        })
        .catch( err => {
            res.status(500).json({ errorMessage: err.message })
        })
})

// Create token
function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '12h'
    };
    return jwt.sign(payload, secret, options)
}

module.exports = router;