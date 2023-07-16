const express = require('express');
const router = express.Router();
const {insert, update, remove, getPicturesByAlbumId, getCollectionById} = require("../mongoData");
const {responseGet} = require("../headers");

/* GET comments listing. */
router.get('/', function (req, res, next){
    const query = req.query;

    if(query){
        getPicturesByAlbumId(query.albumId).then(data => responseGet(res, data));
    } else {
        getCollectionById('photos').then(data => responseGet(res, data));
    }
});

router.get('/:id', function (req, res, next) {
    getCollectionById('photos',req.params.id).then(data => responseGet(res, data));
});

/* POST comments section. */
router.post('/', (req, res) => {
    insert('photos', req.body);

    res.status(200).json({ message: 'Picture received and processed successfully' });
})


/* PUT comments section. */
router.put('/', (req, res) => {
    update('photos', req.body);

    res.status(200).json({ message: `Picture with ID ${req.body.id} updated successfully` });
})


/* DELETE comments section. */
router.delete('/', (req, res) => {
    remove('photos', req.body.id);

    res.status(200).json({ message: `Picture with ID ${req.body.id} deleted successfully` });
})


module.exports = router;
