const fs = require("fs");
const { readFileSync } = require("node:fs");
const path = require("path")
const router = require("express").Router();

router.get('/api/notes', function(req,res){
    let data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8")
    res.json(JSON.parse(data))
})

module.exports = router;