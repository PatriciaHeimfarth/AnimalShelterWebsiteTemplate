const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let Animal = require('./models/animal');

app.listen(port, () => console.log("[Server] online " + new Date()));


app.get("/", function (req, res) {
    res.send({ msg: "Hello World" });
});


app.get("/animals/dogs", function (req, res) {
    res.send({ msg: "Hello Dogs" });
});

app.get("/animals", function (req, res) {
    Animal.find(function(err, animals) {
        if (err) {
            console.log(err);
        } else {
            res.json(animals);
        }
    });
});

app.post("/animals/add", function (req, res) {
    const animal = new Animal({
        Species: req.body.species,
        Name: req.body.name,
    });
    animal.save().then(val => {
        res.json({ msg: "Animal was added successfully!", val: val })
    })
});

// Database

mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
})
