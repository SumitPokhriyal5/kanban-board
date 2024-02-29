const express = require('express');
const connectDB = require('./config/db');
const app = express();
app.use(express.json());




app.get("/", (req, res) => {
    res.send("Welcome to Kanban-board's API Home page...")
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
