const mongoose  = require('mongoose')
const Schema = mongoose.Schema
// tạo collection users = table 
const Users = new Schema ({
    username:{type: String, unique: true, maxLenth: 255},
    password:{type: String},
    email:{type: String, unique: true},
    name:{type: String},
    avatar:{type: String},
    age:{type: String, min:18, max:65},
    available:{type: Boolean, default: false},
},{
    timestamps: true
})
module.exports = mongoose.model('user', Users)