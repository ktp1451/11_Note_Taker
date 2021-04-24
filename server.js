//dependencies
const express = require("express");
const apiroutes = require('./routes/apiRoutes.js')
const htmlroutes = require('./routes/htmlRoutes.js')

//express app
const app = express();

//PORT number
const PORT = process.env.PORT || 8000;

//middlewear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.use(apiroutes)
app.use(htmlroutes)

app.listen(PORT, function(){
    console.log('server listening on PORT:${PORT}')
})