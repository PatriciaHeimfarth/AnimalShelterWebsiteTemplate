const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const DIR = '../frontend/animalshelter-app/public/images/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


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
    Animal.find(function(err, animals) {
        if (err) {
            console.log(err);
        } else {
            res.json(animals);
        }
    });
});


app.post('/animals/add', upload.single('Image'), (req, res, next) => {  
    console.log(req.file) 
    connectEnsureLogin.ensureLoggedIn();
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

 
//TODO: Delete Route

// Database

mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
})


//Login Function

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

const connectEnsureLogin = require('connect-ensure-login');

app.get('/login', function (req, res) {
    res.send({ msg: "Hello Dogs" });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.redirect('/login?info=' + info);
      }
  
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
  
        return res.redirect('/');
      });
  
    })(req, res, next);
  });
  

