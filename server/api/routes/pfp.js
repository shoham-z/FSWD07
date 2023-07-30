const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: 'pfps/',
    limits: { fileSize: 10 * 1024 * 1024 } // Set the file size limit to 10MB
});
const {getUsername, addUser} = require("../dbBridge");

/* POST pfp section. */
router.post('/', upload.single('pfp'), async function (req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file received' });
    }

    // Do something with the file, e.g., save it to a database or process it

    const customFileName = req.file.originalname;
    const newPath = 'pfps/' + customFileName;
    fs.renameSync(req.file.path, newPath);
    res.status(200).json({ message: 'File uploaded successfully' });
});

module.exports = router;