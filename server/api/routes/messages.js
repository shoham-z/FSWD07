const express = require('express');
const router = express.Router();
const {responseGet} = require('../headers');
const {getMessages, addMessage} = require('../dbBridge')


router.get('/',function(req,res,next){
    console.log(`${req.query.userPhone}, ${req.query.contact}`)
    const p = getMessages(req.query.userPhone,req.query.contact)
})
