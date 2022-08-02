// Requiring modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

//Declaring port to any or 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

// Using a middleware for public files
app.use(express.static("public"));

const getFile = (file) => {
  return path.join(__dirname, file);
};

const getHtml = (name) => {
  return getFile(`../public/${name}.html`);
};

const getDb = () => {
  return getFile(`../db/db.json`);
};

// Notes route
app.get("/notes", (req, res) => {
  res.sendFile(getHtml("notes"));
});

// Index route
app.get("/", (req, res) => {
  res.sendFile(getHtml("index"));
});

// Updating db
app.get("/api/notes", (req, res) => {
  res.sendFile(getDb());
});

// Making a post request, reading db, assigning ID to each note and appending it to db and updating it.
app.post("/api/notes", (req, res) => {
  fs.readFile(getDb(), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      const note = {
        id: uuid.v4(),
        ...req.body,
      };

      notes.push(note);

      fs.writeFile(getDb(), JSON.stringify(notes, null, 4), (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.log("Successfully added a new note!")
      );
    }
  });
  res.status(201).send();
});

// Making a delete request, reading the file and removing the note with given id and then rewriting db. 
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(getDb(), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== req.params.id);

      fs.writeFile(getDb(), JSON.stringify(notes, null, 4), (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.log("Successfully deleted a note!")
      );
    }
  });
  res.status(200).send();
});
