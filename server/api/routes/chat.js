const express = require('express');
const router = express.Router();
const {responseGet} = require('../headers');
const {getChats, findContact, getUsername} = require('../dbBridge')


router.get('/', async function (req, res, _next) {
    let l = [];
    const numbers = await getChats(req.query.phone)
    console.log(numbers)
    for (const {phone} of numbers) {
console.log(phone)
        let name = await findContact(req.query.phone, phone)
        console.log("name1: "+name);
        console.log("type: "+name.type);
            if(name.length===0) name = await getUsername(phone);
        console.log("name2: "+name);
        console.log({phone, name})

        l.push({phone, name});
    }
    responseGet(res, l);
})


module.exports = router;
