let notes = require("../db/db.json");
const fs = require("fs");
var path = require("path");
var datapath = path.join(__dirname, "../db/db.json");
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
    fs.readFile(datapath, function (error) {
      if (error) throw error;

      var filteredNote = notes.filter((note) => note.id !== req.params.id);
      fs.writeFileSync(datapath, JSON.stringify(filteredNote), function (
        error
      ) {
        if (error) throw error;
      });
    });
    res.json({ ok: true });
  });
};
