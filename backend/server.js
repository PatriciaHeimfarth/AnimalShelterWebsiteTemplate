const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const utils = require('./utils');


const DIR = '../frontend/animalshelter-app/public/images/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



let Animal = require('./models/animal');

app.listen(port, () => console.log("[Server] online " + new Date()));

// Image upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


//API


app.get("/", function (req, res) {
    res.send({ msg: "Hello World" });
});


app.get("/animals/dogs", function (req, res) {
    res.send({ msg: "Hello Dogs" });
});

app.get("/animals", function (req, res) {
    Animal.find(function (err, animals) {
        if (err) {
            console.log(err);
        } else {
            res.json(animals);
        }
    });
});

app.get("/animals/:id", function (req, res) {
    let id = req.params.id;
    Animal.findById(id, function (err, animal) {
        res.json(animal);
    });
});


app.post('/animals/add', upload.single('Image'), (req, res, next) => {
    console.log(req.file)
    //connectEnsureLogin.ensureLoggedIn();
    const animal = new Animal({
        _id: new mongoose.Types.ObjectId(),
        Species: req.body.Species,
        Name: req.body.Name,
        Description: req.body.Description,
        Birthdate: req.body.Birthdate,
        IsEmergencyCase: req.body.IsEmergencyCase,
        Image: DIR + req.file.filename
    });

    animal.save().then(result => {
        res.status(201).json({
            message: "New animal successfully created!",
            profileCreated: {
                _id: result._id,
                Species: result.Species,
                Name: result.Name,
                Image: result.Image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})


app.post('/animals/delete', (req, res, next) => {
    Animal.deleteOne({ _id: req.body.id }).then(
        () => {
            res.status(200).json({
                message: 'Animal deleted successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});


// Database

mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
})


//Login Function

const userData = {
    username: "admin",
    password: "123456"
};

app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return next();

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user;
            next();
        }
    });
});

app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const password = req.body.password;

    if (!user || !password) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }

    if (user !== userData.username || password !== userData.password) {
        return res.status(401).json({
            error: true,
            message: "Username or Password is not correct."
        });
    }

    const token = utils.generateToken(userData);
    const userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
});


app.get('/verifyToken', function (req, res) {
    var token = req.body.token || req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        if (user.userId !== userData.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        var userObj = utils.getCleanUser(userData);
        return res.json({ user: userObj, token });
    });
});

