var express = require("express");
var app = express();
var bodyParser = require('body-parser')

var port = 3000;

var mongoose = require('./mongoose').mongoose;
var notesSchema = require('./mongoose').notesSchema;
var Note = mongoose.model("Note", notesSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/addnote', (req, res) => {
    const time = req.body.time
    const noteText = req.body.note
    const noteData = {
        time,
        noteText
    }

    var note = new Note(noteData);
    note.save()
        .then(item => {
            console.log(note)
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    // res.end()
})

app.get("/addnote",(req,res)=>{

    Note.find({}).then((docs)=>res.send(docs))
    

})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});