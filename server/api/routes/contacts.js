const express = require('express');
const router = express.Router();
const {responseGet} = require("../headers");
const {getContactsByUserId, addContact, getContacts} = require("../dbBridge");

/* GET contacts section. */
router.get('/', function (req, res, next) {
    console.log(req.query.userPhone)
    const p = req.query.userPhone ? getContactsByUserId(req.query.userPhone) : getContacts()
    p.then(data => responseGet(res, data))
});

/* POST contacts section. */
router.post('/', (req, res) => {
    console.log(req.query.userPhone, req.body)
    addContact(req.query.userPhone, req.body)
        .then(response => {
            if (response === 0) res.status(200).json({message: 'New contact successful'});
        })
        .catch(err => console.log(err))


})


/* PUT contacts section. */
router.put('/', (req, res) => {
    let data = req.body;

    update('users', data);

    res.status(200).json({message: `User with ID ${data.id} updated successfully`});
})


/* DELETE contacts section. */
router.delete('/', (req, res) => {
    let data = req.body;

    remove('users', data.id);

    res.status(200).json({message: `User with ID ${req.body.id} deleted successfully`});
})

router.delete('/delete-user', (req, res) => {
    let data = req.body;

    removeUser('loginCredentials', data.username);

    res.status(200).json({message: `User with ID ${req.body.id} deleted successfully`});
})

module.exports = router;
