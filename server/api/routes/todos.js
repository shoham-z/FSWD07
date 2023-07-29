const express = require('express');
const router = express.Router();
const {insert, update, remove, getCollectionById, getTodosByUserId} = require("../dbBridge");
const {responseGet} = require("../headers");

/* GET todos listing. */
router.get('/', function (req, res, next){
    const query = req.query;

    if(query){
        getTodosByUserId(query.userId).then(data => responseGet(res, data));
    } else {
        getCollectionById('posts').then(data => responseGet(res, data));
    }
});

router.get('/:id', function (req, res, next) {
    getCollectionById('todos', req.params.id).then(data => responseGet(res, data));
});


/* POST todos section. */
router.post('/', (req, res) => {
    insert('todos', req.body);

    res.status(200).json({ message: 'Todo data received and processed successfully' });
})


/* PUT todos section. */
router.put('/', (req, res) => {
    let data = req.body;

    update('todos', data);

    res.status(200).json({ message: `Todo with ID ${data.id} updated successfully` });
})


/* DELETE todos section. */
router.delete('/', (req, res) => {
    let data = req.body;

    remove('todos', data.id);

    res.status(200).json({ message: `Todo with ID ${req.body.id} deleted successfully` });
})

module.exports = router;
