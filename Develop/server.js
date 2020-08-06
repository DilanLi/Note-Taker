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

  app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
      const newData = JSON.parse(data);

      res.json(newData);
    })
    
    });

  
  //this function receives a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
  app.post("/api/notes", function(req, res) {        
        //first read the db.json file
        fs.readFile('db/db.json', "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          //turn the db.json file into an array of javascript objects
          var jsonNotes = JSON.parse(data);
          //push to the array of objects
          jsonNotes.push(req.body);
          //turn the objects into string again and over write the db.json file
          fs.writeFile("db/db.json", JSON.stringify(jsonNotes), function(err, result){
            if (err) {
              return console.log(err);
            } 
            res.json(jsonNotes);
          })
      })
      });
  

  app.delete('/api/notes/:id', function (req, res) {
        const id = req.params.id;
        console.log(id);
        fs.readFile('db/db.json', "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          //turn the db.json file into an array of javascript objects
          let jsonNotes = JSON.parse(data);
          //take out the note with its title matching the id in api/notes/:id
          jsonNotes = jsonNotes.filter(note => note.id !== id);

          //turn the objects into string again and over write the db.json file
          fs.writeFile("db/db.json", JSON.stringify(jsonNotes), function(err, result){
            if (err) {
              return console.log(err);
            } 
            res.json(jsonNotes);
          })
      })
      })

  app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
      });

//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  