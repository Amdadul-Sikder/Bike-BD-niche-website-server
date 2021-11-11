const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

//middlewere
app.use(cors());
app.use(express.json());

// connect database
const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.nocvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log("server running at port", port);
})
