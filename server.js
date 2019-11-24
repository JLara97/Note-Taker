const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v4");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});