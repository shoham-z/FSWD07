const express = require('express');
const router = express.Router();
const {responseGet} = require("../headers");
const {getContactsByUserId} =require("../dbBridge");

/* GET users section. */
router.get('/', function (req, res, next) {
    console.log(req.query.userPhone)
    const data = getContactsByUserId(req.query.userPhone);
    responseGet(res, data)
});

router.get('/:username', function (req, res, next) {
    console.log(req.params.username)
    getCollectionByUsername('users', req.params.username).then(data => responseGet(res, data));
});

/* POST users section. */
router.post('/', (req, res) => {
    console.log(req.body)


    res.status(200).json({message: 'User data received and processed successfully'});
})

router.post('/change-password', (req, res) => {
    console.log('coming to change password')

    let success = false;

    getCollectionByUsername('loginCredentials', req.body.username)
        .then(data => {
            if (data[0].password === req.body.oldPassword) {
                updateUsername(req.body.username, req.body.newPassword)
                    .then(_r => success = true)
            }
            else {
                res.status(200).json({message: 'Passwords not matching'});
            }
        });


    if (success) {res.status(200).json({message: 'Password Changed'}); console.log("Password Changed")}
})


/* PUT users section. */
router.put('/', (req, res) => {
    let data = req.body;

    update('users', data);

    res.status(200).json({message: `User with ID ${data.id} updated successfully`});
})


/* DELETE users section. */
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