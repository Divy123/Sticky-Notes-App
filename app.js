var express = require("express");
var app = express();
var port = 3000;

app.use(express.static('public'))
 
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});