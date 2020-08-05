// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.get("/api/notes", function(req, res) {
    res.fs.readFile("db/db.json", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
    
      console.log(data);
    })
    
    });
  

  app.post("/api/notes", function(req, res) {
    console.log(typeof req.body);
    const newNote = JSON.stringify(req.body);
    fs.appendFile("db/db.json", newNote, function(err) {
      if (err) {
        return console.log(err);
      }
      // console.log(data);
    // const jsonNotes = JSON.parse(data);
    //   console.log(jsonNotes);
    
    });  
  
  });


//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  