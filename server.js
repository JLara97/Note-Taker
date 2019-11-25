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

app.get("/api/notes", async function (req, res) {

    try {
        const notes = await readFile("./db/db.json", "utf8");
        res.json(JSON.parse(notes));
    } catch (err) {
        res.status(500).end();
    }

});

app.post("/api/notes", async function (req, res) {
    try {
        const notes = JSON.parse(
            await readFile("./db/db.json", "utf8")
        );
        const note = { ...req.body, id: uuid() };
        console.log(note);
        notes.push(note);
        await writeFile("./db/db.json", JSON.stringify(notes, null, 2));

        res.json(note);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});



app.delete("/api/notes/:id", async function (req, res) {

    try {
        const id = req.params.id;

        const notes = JSON.parse(
            await readFile("./db/db.json", "utf8")
        );

        let note = notes.filter(note => note.id != id);

        await writeFile("./db/db.json", JSON.stringify(note, null, 2));

        res.json(note)
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});