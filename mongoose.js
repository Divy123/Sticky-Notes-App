var mongoose = require("mongoose");
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost:27017/notes-app",{
    useCreateIndex:true,
    useNewUrlParser:true
});

var notesSchema = new mongoose.Schema({
    time: {
        type:String
    },
    noteText: {
        type: String,
        trim: true
    },
    remind: {
        type: Boolean,
        default:false
    }
   });

module.exports = {
    mongoose,
    notesSchema
}