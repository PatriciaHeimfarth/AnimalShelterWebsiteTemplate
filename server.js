const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log("[Server] online " + new Date()));

 
app.get("/", function (req, res) {
    res.send({ msg: "Hello World" });
});

app.get("/cats", function (req, res) {
    res.send({ msg: "Hello Cats" });
});

app.get("/dogs", function (req, res) {
    res.send({ msg: "Hello Dogs" });
});

 