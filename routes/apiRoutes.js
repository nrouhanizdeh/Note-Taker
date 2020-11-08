var path = require("path");
var datapath = path.join(__dirname, "../db/db.json");
var notes = require("../db/db.json");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  // API POST Requests
  app.post("/api/notes", function (req, res) {
    var title = req.body.title;
    var text = req.body.text;
    var newNote = {
      title,
      text,
      id: uuidv4(),
    };
    notes.push(newNote);
    fs.writeFileSync(datapath, JSON.stringify(notes), "utf8", function (err) {
      if (error) throw error;
    });
    res.json({ ok: true });
  });

  app.delete("/api/notes/:id", function (req, res) {
    var filteredNote = notes.filter((note) => note.id !== req.params.id);
    fs.writeFileSync(datapath, JSON.stringify(filteredNote), "utf8", function (
      err
    ) {
      if (error) throw error;
    });
    res.json({ ok: true });
  });
};
