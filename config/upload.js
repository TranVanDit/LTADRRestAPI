const multer = require('multer')
const _storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"public/uploads")
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()} - ${file.originalname}`);
    }
});
const upload = multer({
    storage : _storage,
    limits:{
        fileSize: 5*1024*1024
    }
})
module.exports = upload