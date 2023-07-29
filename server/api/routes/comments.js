const express = require('express');
const router = express.Router();
const {insert, update, remove, getCommentsByPostId, getCollectionById} = require("../dbBridge");
const {responseGet} = require("../headers");

/* GET comments listing. */
router.get('/', function (req, res, next){
    const query = req.query;

    if(query){
        getCommentsByPostId(query.postId).then(data => responseGet(res, data));
    } else {
        getCollectionById('comments').then(data => responseGet(res, data));
    }
});

router.get('/:id', function (req, res, next) {
    getCollectionById('comments',req.params.id).then(data => responseGet(res, data));
});

/* POST comments section. */
router.post('/', (req, res) => {
    insert('comments', req.body);

    res.status(200).json({ message: 'Comment received and processed successfully' });
})


/* PUT comments section. */
router.put('/', (req, res) => {
    update('comments', req.body);

    res.status(200).json({ message: `Comment with ID ${req.body.id} updated successfully` });
})


/* DELETE comments section. */
router.delete('/', (req, res) => {
    remove('comments', req.body.id);

    res.status(200).json({ message: `Comment with ID ${req.body.id} deleted successfully` });
})


module.exports = router;
