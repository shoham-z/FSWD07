const express = require('express');
const router = express.Router();
const {getUsername, addUser} = require("../dbBridge");

/* POST register section. */
router.post('/', async function (req, res, next) {
    const {username, password} = req.body;

    let response = await getUsername(username);

    console.log(response)
    if (!response) {
        // Successful register

        addUser(username, password).then(r => {
            if (r !== 0) console.log("bad register")
        });
        res.status(200).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Register successful'});
    } else {
        // Username taken
        res.status(401).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Username taken'});
    }
});

module.exports = router;