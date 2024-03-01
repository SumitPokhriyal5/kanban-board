const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session')
require('./config/auth')
const app = express();
app.use(express.json());

function isLoggedIn(req, res, next) {
    req.user ?  next() : res.sendStatus(401);
}


app.get("/", (req, res) => {
    res.send("Welcome to Kanban-board's API Home page...")
});

app.use(session({
    secret: 'kanban-board',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req, res) => {
    res.send("Something went wrong!");
});

app.get('/auth/google/success', isLoggedIn, (req, res) => {
    const name = req.user.displayName;

    res.send(`Hello ${name}`);
});

app.use('/auth/logout', (req, res) => {
    req.session.destroy();
    res.send("See you again!")
})
app.listen(process.env.PORT ?? 8080, async () => {
    try {
         console.log(`✅ Server started at : http://localhost:${process.env.PORT ?? 8080}`);
         console.log('⏳ Database connecting...')
         await connectDB;
         console.log('✅ Database Connected')
    } catch (error) {
         console.log('❌ error:', error.message);
    }
})
