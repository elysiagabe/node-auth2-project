const router = require('express').Router();

const Users = require('./user-model');

// ~~ ENDPOINTS ~~ //
// GET all users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

module.exports = router;