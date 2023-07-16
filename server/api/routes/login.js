const express = require('express');
const router = express.Router();
const {getUsername} = require("../mongoData");

/* POST login section. */
router.post('/', async function (req, res, next) {
    const {username, password} = req.body;

    let response = await getUsername(username);
    console.log(response)

    if (username === response.username && password === response.password) {
        // Successful login
        res.status(200).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Login successful'});
    } else {
        // Invalid credentials
        res.status(401).setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Invalid username or password'});
    }
});

module.exports = router;