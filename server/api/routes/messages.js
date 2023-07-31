const express = require('express');
const router = express.Router();
const {responseGet} = require('../headers');
const {getMessages, addMessage} = require('../dbBridge')


router.get('/',function(req,res,next){
    console.log(`${req.query.userPhone}, ${req.query.contactPhone}`)
    const p = getMessages(req.query.userPhone, req.query.contactPhone)
    p.then(data => responseGet(res, data))
})

router.post('/', (req, res) => {
    console.log(req.query.userPhone, req.body)
    addMessage(req.query.userPhone, req.body.chatId,)
        .then(response => {
            if (response === 0) res.status(200).json({message: 'New contact successful'});
        })
        .catch(err => console.log(err))
})