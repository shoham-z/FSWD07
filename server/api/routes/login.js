const express = require('express');
const router = express.Router();
const {usernamePasswordMatch} = require("../dbBridge");

/* POST login section. */
router.post('/', async function (req, res, _next) {
    const {username, password} = req.body;
    console.log(req.body)
    if (!username || !password) {
        res.status(400).json({error: "userName and password are required"});
        return;
    }
    let response = await usernamePasswordMatch(username, password);
    console.log(response)

    if (response === 0) {
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