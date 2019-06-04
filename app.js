const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const hbs = require('hbs');
const flash = require('express-flash');
const session = require('express-session');


var mongoose = require('./mongoose').mongoose;
var notesSchema = require('./mongoose').notesSchema;
var Note = mongoose.model("Note", notesSchema);

var viewsPath = path.join(__dirname, './templates/views');
var partialsPath = path.join(__dirname, './templates/partials');
var port = 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))

app.use(session({
    secret : "hey this is my secret key by Divy",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());


app.post('/edit/',(req,res)=>{
    const time = req.body.time
    const noteText = req.body.note
    const remind = (req.body.reminder ==='on')?true:false
    const noteData = {
        time,
        noteText,
        remind
    }
    Note.findOneAndUpdate( {"time": noteData.time}, noteData, function (err, result) {
        if (err) { 
            console.log(err)
         }
         res.status(200).redirect('/list-note');
})
});

app.get("/", (req, res) => {
    res.status(200).render('index');
    
});

app.get("/edit/:id", (req,res)=>{
    Note.findOne( {"time": req.params.id}, function (err, result) {
    res.render('update-form',result)
})
})

app.post('/list-note', (req, res) => {
    const time = req.body.time
    const noteText = req.body.note
    const remind = (req.body.reminder ==='on')?true:false
    const noteData = {
        time,
        noteText,
        remind
    }

    Note.findOne( {"time": noteData.time}, function (err, result) {
        if (err) { 
            console.log(err)
         }
        if (!result) {
            var note = new Note(noteData);
        note.save()
            .then(item => {
                res.status(200).redirect('/list-note');
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        }
        else {
                req.flash('error','Note already exists');
                res.redirect('/');
            }
    });
})


app.get("/list-note", (req, res) => {
    var time = [],
        noteText = [];
    Note.find({}).then((docs) => {

        res.render('notes', {
            docs
        })
    })


})

app.delete('/list-note/:id',(req,res)=>{
    console.log(req.params.id);
    Note.findOneAndDelete( {"time": req.params.id}, function (err, result) {
        if (err) { 
            console.log(err)
            res.status(404).send({"message":"Note not found"})
         }
         var obj = {...result, message:"ok"}
    res.status(200).send(JSON.stringify(obj))
})
})

app.patch('/list-note/:id',(req,res)=>{
    Note.findOneAndUpdate({"time": req.params.id},{"remind":!req.body.remind},function (err, result) {
        if (err) { 
            console.log(err)
            res.status(404).send({"message":"Note not found"})
         }
    res.status(200).send({"message":"ok"})
})
})



app.listen(port, () => {
    console.log("Server listening on port " + port);
});