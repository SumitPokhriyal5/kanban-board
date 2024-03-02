require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/auth.route");
const connectDB = require("./config/db");
const app = express();
require('./config/passport');

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRouter);

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
