const express = require('express');
const router = express.Router();
const {addUser, getUser} = require("../dbBridge");

/* POST register section. */
router.post('/', async function (req, res, _next) {

    let response = await getUser(req.body.username);

    if (response.length === 0) {
        // Successful register

        addUser(req.body)
            .then((response) => {
                res.status(200).setHeader('Access-Control-Allow-Origin', '*');
                res.json({message: 'Register successful'});
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(401).setHeader('Access-Control-Allow-Origin', '*');
                //res.json({message: 'Username taken'});
            });

        if (response !== 0) console.log("bad register")

    } else {
        // Username taken
        res.status(401).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Username taken'});
    }
});

module.exports = router;