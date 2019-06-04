var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/notes-app",{
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