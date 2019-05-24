var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/notes-app",{
    useCreateIndex:true,
    useNewUrlParser:true
});

var notesSchema = new mongoose.Schema({
    time: String,
    noteText: String
   });

module.exports = {
    mongoose,
    notesSchema
}