require('dotenv').config();     // dotenv is used to load environment variables from a .env file into process.env

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const pagesRoutes = require('./routes/pages.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// const MONGO_URL = "mongodb://127.0.0.1:27017/steganoDB"; -> for local MongoDB
const dbUrl = process.env.ATLASDB_URL;      // for MongoDB Atlas

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,      // change session only once in 24 hours
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,                      // store session data in MongoDB - Atlas
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   // 1 week = 7 days * 24 hours * 60 minutes * 60 seconds * 1000 ms. 1000 ms = 1 second
        maxAge: 7 * 24 * 60 * 60 * 1000,                // 1 week
        httpOnly: true                                  // cookie cannot be accessed via client-side scripts, only sent via HTTP, enhancing security
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {   // this function will run for every single request and set these local variables for all templates
    res.locals.success = req.flash('success');  // without next(), we will stuck in this middleware
    res.locals.error = req.flash('error');
    res.locals.isAdmin = req.session.isAdmin || false;
    next();
});

// Note: session and flash should be set up before defining routes so that they are accessible in all routes
app.use('/', pagesRoutes);    // use the routes defined in routes/pages.js



app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found..!!'));
});

app.use((err, req, res, next) => {
    let { statusCode=500, message="Something went wrong..!!" } = err;
    res.status(statusCode).render('error.ejs', { message });
    // res.status(statusCode).send(message);
});

app.get('/', (req, res) => {
    res.send('Hii Poovi, you are on root page..!!');
});