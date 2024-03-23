var express = require('express');
var router = express.Router();
const modelUser = require('../models/user');
const JWT = require('jsonwebtoken');
const SECRET_KEY = "Dittv"

/*--Get users listing. */
router.post('/checkLogin', async(req, res)=> {
   try{
        const{username, password} = req.body;
        const user = await modelUser.findOne({username, password})
        if(user){
            //Token người dùng sẽ sử dụng gửi lên trên header mỗi lần muốn gọi API
            const token = JWT.sign({id: user._id}, SECRET_KEY,{expiresIn: '1h'});

            const refreshToken = JWT.sign({id: user._id},SECRET_KEY,{expiresIn:'1d'})
            res.json({
                "status": 200,
                "messenger":"Đăng nhập thành công",
                "data":user,
                "token":token,
                "refreshToken":refreshToken

            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, đăng nhập không thành công",
                "data":[]
            })
        }
   }catch(error){
         console.log(error);
   }
});
module.exports = router;