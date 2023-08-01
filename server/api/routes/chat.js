const express = require('express');
const router = express.Router();
const {responseGet} = require('../headers');
const {getChats, findContact, getUsername} = require('../dbBridge')


router.get('/', async function (req, res, next) {
    let l = [];
    const numbers = await getChats(req.query.phone)

    for (const phone of numbers) {

        let name = await findContact(req.query.phone, phone.phone) || await getUsername(phone);

        l.push({phone: phone.phone, name: name[0].name});
    }
    responseGet(res, l);
})


module.exports = router;
