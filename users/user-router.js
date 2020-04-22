const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Users = require('./user-model');

// ~~ ENDPOINTS ~~ //
// GET all users
router.get('/', (req, res) => {
    // const { department } = req.body;
    const token = req.headers.authorization;
    console.log("token from get request", token)

    if(token) {
        const { department } = jwt.decode(token);

        Users.findBy({ department })
            .then(users => {
                if(users) {
                    res.status(200).json(users)
                } else {
                    res.status(401).json({ message: "No users in that department" })
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: err.message })
            })


    } else {
        res.status(400).json({ message: 'Please provide your login credentials to access this information.' })
    }

    // Users.find()
    //     .then(users => {
    //         // if(users) {
    //             res.json(users)
    //         // } else {
    //             // res.status(401).json({ message: "Could not find users in that department" })
    //         // }
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: err.message })
    //     })
})

module.exports = router;