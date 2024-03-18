var express = require('express');
var router = express.Router();
const modelDistributors = require('../models/distributors');

/*--Get users listing. */
router.get('/test', function(req, res, next){
    res.send('respond with a resource distributors test');
});
//add data 
router.post ('/add', async(req, res) => {
    try{
        const model = new modelDistributors(req.body)
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

router.get('/list',async(req, res)=>{
    const result = await modelDistributors.find({})
    try{
        res.send(result)
    }catch(error){
        console.log(error);
    }
})
/*----------------------getByID-----------------*/
router.get('/getbyid/:id',async(req, res)=>{
   
    try{
         const result = await modelUser.findById(req.params.id)
        if(result){
            // const result = await result.save()
            res.send(result)
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

/*-----------------Edit----------------------*/
router.patch('/edit/:id',async(req, res)=>{
    
    try{
        const result = await modelUser.findByIdAndUpdate(req.params.id,req.body)
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
router.patch('/edit/:id',async(req, res)=>{
    
    try{
        const result = await modelDistributors.findByIdAndUpdate(req.params.id,req.body)
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
router.delete('/delete/:id',async(req, res)=>{
    
    try{
        const result = await modelDistributors.findByIdAndDelete(req.params.id)
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