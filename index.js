const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const properties = require('./routes/properties');
const user = require('./routes/users');

app.use("/static", express.static("public"));//remove

app.use(express.urlencoded({ extended: true}));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());         // use body-parser middleware
app.use('/properties',properties);
app.use('/auth',user);

mongoose.connect('mongodb+srv://todoListApp:test@cluster0-l6um6.mongodb.net/test?retryWrites=true&w=majority');

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
