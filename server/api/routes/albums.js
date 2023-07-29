const express = require('express');
const router = express.Router();
const {insert, update, remove, getPicturesByAlbumId, getCollectionById, getAlbumsByUserId} = require("../dbBridge");
const {responseGet} = require("../headers");

/* GET posts listing. */
router.get('/', function (req, res, next){
    const query = req.query;

    if(query){
        getAlbumsByUserId(query.userId).then(data => responseGet(res, data));
    } else {
        getCollectionById('albums').then(data => responseGet(res, data));
    }
});

router.get('/:id', function (req, res, next) {
    getCollectionById('albums',req.params.id).then(data => responseGet(res, data));
});

router.get('/:id/photos', function (req, res, next) {
    getPicturesByAlbumId(req.params.id).then(data =>  responseGet(res, data));
});


/* POST posts section. */
router.post('/', (req, res) => {
    insert('albums', req.body);

    res.status(200).json({ message: 'Album received and processed successfully' });
})


/* PUT posts section. */
router.put('/', (req, res) => {
    let data = req.body;

    update('albums', data);

    res.status(200).json({ message: `Album with ID ${req.body.id} updated successfully` });
})


/* DELETE posts section. */
router.delete('/', (req, res) => {
    let data = req.body;

    remove('albums', data.id);

    res.status(200).json({ message: `Album with ID ${req.body.id} deleted successfully` });
})


module.exports = router;
