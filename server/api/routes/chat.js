const express = require('express');
const router = express.Router();
const {responseGet} = require('../headers');
const {getChats} = require('../dbBridge')


router.get('/',function(req,res,next){
    console.log(req.query.phone)
    getChats(req.query.phone).then(data => responseGet(res, data))
})



module.exports = router;
