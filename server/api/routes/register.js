const express = require('express');
const router = express.Router();
const {addUser, getUser} = require("../dbBridge");

/* POST register section. */
router.post('/', async function (req, res, next) {
    const {username, password, name, phone, email} = req.body;

    console.log(req.body)

    let response = await getUser(username);

    console.log("got user: " + response)

    if (response) {
        // Successful register

        const response = addUser(req.body)

        if (response !== 0) console.log("bad register")

        res.status(200).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Register successful'});
    } else {
        // Username taken
        res.status(401).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Username taken'});
    }
});

module.exports = router;