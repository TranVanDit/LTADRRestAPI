var express = require('express');
var router = express.Router();
const modelFruit = require('../models/fruit');
const Upload = require('../config/upload');
const JWT = require('jsonwebtoken');
const SECRET_KEY = "Dittv"

/*--Get users listing. */
router.get('/test', function(req, res, next){
    res.send('respond with a resource Fruit test');
});
//add data 
router.post ('/add', Upload.array ('images',5), async(req, res)=> {
    try{
        const date = req.body
        const {files}= req
        const urlImages = files.map((file)=> `${req.protocol}://${req.get('host')}/uploads/${file.filenma}`)
        const model = new modelFruit(req.body)
        model.images = urlImages
        const result = await model.save();// them du lieu vao db
        if(result){
            res.json({
                "status": 200,
                "message":"Thêm thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "message":"Thêm thất bại",
                "data": []
            })
        }
        // res.send(result)
    } catch (error){
        console.log(error);
    }
})
/*----------------------List-----------------*/
router.get('/list',async(req, res)=>{  
    try{
        const authHeader = req.headers['authorization']
        console.log('authHeader',authHeader)
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) return res.sendStatus(401)
        let payload 
        JWT.verify(token,SECRET_KEY, (err, _payload)=>{
            if(err instanceof JWT.TokenExpiredError)return res.sendStatus
            if(err)return res.sendStatus(403)
            payload= _payload
        })
        const result = await modelFruit.find().populate('id_distributor')
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

/*----------------------getList-----------------*/
router.get('/getListByPrice',async(req, res)=>{
    
    try{
        const {start, end} = req.query// lay du lieu thong qua:id tren url goi la param
        const query = {price: {$gte: start, $lte: end}}
        //$gte lon hon hoav bang
        //$lte nho hon hoac bang
        console.log(query)
        const result = await modelFruit.find(query,'name price quantity id_distributor')
                      .populate('id_distributor')
                      .sort({quantity: -1}) // giam dan = -1, tang dang = 1
                      .skip(0)//bo qua so luong row
                      .limit(2)// lay 2 san pham
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

/*----------------------getByID-----------------*/
router.get('/getbyid/:id', async(req,res)=>{
   
    try{
      const result = await modelFruit.findById(req.params.id)
      if(result){
          res.send(result)
      }else{
          res.json({
              "status":400,
              "message": "Không tin thấy ID",
              "data": []
          })           

      }
      
    }catch (error){
      if(error.name==='CastError'){
          res.status(404).send('Invalid ID format')
      }else{
          console.log(error);
          res.status(500).send('Internal Server Error')
      }
    }
}) 


/*-----------------Edit----------------------*/
router.patch('/edit/:id',async(req, res)=>{
    
    try{
        const result = await modelFruit.findByIdAndUpdate(req.params.id,req.body)
        if(result){
            const rs = await result.save()
            res.send(rs)
        }else{
            res.json({
                "status": 400,
                "message":"Không tìm thấy ID",
                "data": []
            })  
        }
    }catch(error){
       if(error.name === 'CastError'){
        res.status(404).send('Invalid ID format')
       }else{
         console.log(error);
         res.status(500).send('Internal Server Error')
       }
    }
})

module.exports = router;
/*---------------------------------------*/

/*---------------------------------------*/
router.delete('/delete/:id',async(req, res)=>{
    
    try{
        const result = await modelFruit.findByIdAndDelete(req.params.id)
        if(result){
            res.json({
                "status": 200,
                "message":"Xóa thành công",
                "data": result
            }) 
        }else{
            res.json({
                "status": 400,
                "message":"Xóa thất bại",
                "data": []
            })  
        }
    }catch(error){
       if(error.name === 'CastError'){
        res.status(404).send('Invalid ID format')
       }else{
         console.log(error);
         res.status(500).send('Internal Server Error')
       }
    }
})

module.exports = router;