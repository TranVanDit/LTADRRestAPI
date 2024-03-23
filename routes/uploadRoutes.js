var express = require('express');
var router = express.Router();
const Upload = require('../config/upload');

/*--Get users listing. */
router.post('/test', function(req, res, next){
    res.send('respond with a resource  test upload file');
});
/*-----------mulUpload----------------*/
router.post('/mulUpload', Upload.array ('images',5), async(req, res)=>{
    try {
        const date = req.body
        const {files}= req
        const urlImages = files.map((file)=> `${req.protocol}://${req.get('host')}/uploads/${file.filenma}`)
        console.log(urlImages)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;