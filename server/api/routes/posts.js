const express = require('express');
const router = express.Router();
const {insert, update, remove, getCommentsByPostId, getCollectionById, getPostsByUserId} = require("../mongoData");
const {responseGet} = require("../headers");

/* GET posts listing. */
router.get('/', function (req, res, next){
    const query = req.query;

    if(query){
        getPostsByUserId(query.userId).then(data => responseGet(res, data));
    } else {
        getCollectionById('posts').then(data => responseGet(res, data));
    }
});

router.get('/:id', function (req, res, next) {
    getCollectionById('posts',req.params.id).then(data => responseGet(res, data));
});

router.get('/:id/comments', function (req, res, next) {
    getCommentsByPostId(req.params.id).then(data =>  responseGet(res, data));
});


/* POST posts section. */
router.post('/', (req, res) => {
    insert('posts', req.body);

    res.status(200).json({ message: 'Post received and processed successfully' });
})


/* PUT posts section. */
router.put('/', (req, res) => {
    let data = req.body;

    update('posts', data);

    res.status(200).json({ message: `Post with ID ${req.body.id} updated successfully` });
})


/* DELETE posts section. */
router.delete('/', (req, res) => {
    let data = req.body;

    remove('posts', data.id);

    res.status(200).json({ message: `Post with ID ${req.body.id} deleted successfully` });
})


module.exports = router;
