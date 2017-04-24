// Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

var friends = [];


app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "public/home.html"));
});

//survey
app.get("/survey", function(req, res) {

    res.sendFile(path.join(__dirname, "public/survey.html"));
});

app.get("/api/friends", function(req, res) {

    return res.json(friends);
});


app.post("/api/friends", function(req, res) {

    var newfriend = req.body;

    console.log(newfriend);

    friends.push(newfriend);

    res.json(newfriend);
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});