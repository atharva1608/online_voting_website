const mongoose = require('mongoose')

const userTemplate = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    aadharcardno:{
        type:String,
        length:12,
        required:true
    },
    voterid:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },

});
module.exports = mongoose.model('usertable',userTemplate)