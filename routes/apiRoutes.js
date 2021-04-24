const uuid = require('uuid-random');
const fs = require("fs");
const path = require("path")
const router = require("express").Router();

router.get('/api/notes', function(req,res){
    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    res.json(JSON.parse(data))
})

router.post('/api/notes', function(req,res){
    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    const currentNotes = JSON.parse(data)
    currentNotes.push({title:req.body.title, text:req.body.text, id: uuid()})
    fs.writeFile(path.join(__dirname + '/../db/db.json'), JSON.stringify(currentNotes), (err)=> {
        res.json(200)
     })
})

router.delete('/api/notes/:id', function(req,res){
    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    let currentNotes = JSON.parse(data);
        currentNotes = currentNotes.filter(note => note.id != req.params.id)
    fs.writeFile(path.join(__dirname + '/../db/db.json'), JSON.stringify(currentNotes), (err)=> {
        res.json(200)
     })
})

module.exports = router;