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
    console.log(req.body)
    addMessage(req.body.sender, req.body.recipient, req.body.content, req.body.time )
        .then(response => {
            if (response === 0) res.status(200).json({message: 'Send message successful'});
            else res.status(500);
        })
        .catch(err => console.log(err))
})

module.exports = router;
