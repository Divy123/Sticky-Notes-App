var mongoose = require('mongoose');

var notesSchema = new mongoose.Schema({
    time: String,
    noteText: String
   });


   var Note = mongoose.model("Note", notesSchema);

   module.exports = Note;