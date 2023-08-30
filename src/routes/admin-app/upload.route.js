const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const multer = require('multer');
const path = require('path');
const { port } = require('../../startup/config')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');  
    },
    filename: function(req, file, cb){
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})


var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
}).single('href');

router.post('/file', upload, awaitHandlerFactory(async (req, res, next) => {    
    res.json({
        file: `${req.file.filename}`
    })
}));


module.exports = router;