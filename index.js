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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nocvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

async function run() {
    try {
        await client.connect();
        console.log("database connected succesfully");

        //============ database collection ==========//
        const database = client.db('bike_bd');
        // const productsCollection = database.collection('products');
        const orderCollection = database.collection('orders');
        const productsCollection = database.collection('products');
        const reviewCollection = database.collection('review');


        // get products

        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.json(products);
        })

        // post order

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            console.log(result);
            res.json(result)

        })




        // post review

        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            console.log(result);
            res.json(result)

        })

        // get review

        app.get('/review', async (req, res) => {
            const cursor = reviewCollection.find({});
            const review = await cursor.toArray();
            res.json(review);
        })




        // get orders

        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.json(orders);
        })

        // delete orders

        app.delete('/deleteOrder/:id', async (req, res) => {
            const ObjectId = require('mongodb').ObjectID;
            const result = await orderCollection.deleteOne({ _id: ObjectId(req.params.id) });
            res.json(result);
            // console.log(result);
        })


    }
    finally {
        // await client.close(); 
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log("server running at port", port);
})
