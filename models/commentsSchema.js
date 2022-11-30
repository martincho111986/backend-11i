const mongoose = require('mongoose');
const User = require('./userSchema');

const CommentsSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    comment: {
        type: String,
        require: true,
        trim: true
    },
    userid:{
     type: mongoose.Schema.Types.ObjectId,
     ref: User
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;