const mongoose = require('mongoose')

const voteTemplate = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
       
        },
    vote:{
        type: String,
        required:true
    }    

});
module.exports = mongoose.model('votetable',voteTemplate)