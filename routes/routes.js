const fs = require('fs');
const { readFile } = require('node:fs');
const path = require('path');

module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API ROUTES
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });

        // app.get("/api/notes", function(req, res) {
        //     readFileSync(path.join(__dirname, "../db/db.json"), "utf8").then((notes) => {
        //         let currentNotes = [];
        //         try {
        //             currentNotes = JSON.parse(notes);
        //             console.log(notes);
        //             res.json(currentNotes);
        //         } catch(err) {
        //            res.json(200); 
        //         }
        //     })
        // });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // app.post("/api/notes", function(req, res) {
        //     readFileSync(path.join(__dirname, "../db/db.json"), "utf8").then((notes) => {
        //         const currentNotes = JSON.parse(notes) ;
                
        //         currentNotes.push({title:req.body.title, text:req.body.text, id: uuid()})
        //         fs.writeFile(path.join(__dirname + '/../db/db.json'), JSON.stringify(currentNotes), (err)=> {
        //             res.json(200)
        //         })
        //     })
        // });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        // app.delete("/api/notes/:id", function(req, res) {
        //     readFileSync(path.join(__dirname, "../db/db.json"), "utf8").then((notes) => {
        //         let currentNotes = JSON.parse.apply(notes);
        //         currentNotes = currentNotes.filter(note => note.id != req.params.id)
        //         fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(currentNotes), (err)=> {
        //             res.json(200)
        //         })
        //     })
        // });

        // VIEW ROUTES
        // Display notes.html when /notes is accessed
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
