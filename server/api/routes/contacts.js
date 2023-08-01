const express = require('express');
const router = express.Router();
const {responseGet} = require("../headers");
const {getUserContacts, addContact, getContacts} = require("../dbBridge");

/* GET contacts section. */
router.get('/', function (req, res, _next) {
    const p = req.query.userPhone ? getUserContacts(req.query.userPhone) : getContacts()
    p.then(data => responseGet(res, data))
});

/* POST contacts section. */
router.post('/', (req, res) => {
    addContact(req.query.userPhone, req.body)
        .then(response => {
            if (response === 0) res.status(200);
        })
        .catch(err => console.log(err))
})


module.exports = router;
