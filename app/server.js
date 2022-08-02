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

