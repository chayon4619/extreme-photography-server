const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w79fzld.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    const servicesCollection = client.db('exPhotographyDB').collection('servicesDB');
    const reviewCollection = client.db('exPhotographyDB').collection('reviewDB');

    app.get('/threeServices', async (req, res) => {
        const query = {};
        const cursor = servicesCollection.find(query);
        const services = await cursor.limit(3).toArray();
        res.send(services);
    });

    app.get('/services', async (req, res) => {
        const query = {};
        const cursor = servicesCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor = await servicesCollection.findOne(query);
        res.send(cursor)
    })

    // review

    app.get('/review/:id', async (req, res) => {
        const query = { serviceId: req.params.id };
        const cursor = reviewCollection.find(query);
        const review = await cursor.toArray();
        res.send(review)
    })
    app.get('/review', async (req, res) => {
        let query = {};
        if (req.query.email) {
            query = { email: req.query.email }
        }
        const cursor = reviewCollection.find(query);
        const review = await cursor.toArray();
        res.send(review)
    })


    app.post('/review', async (req, res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.send(result)
    });

}

run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('Photography website server running');
})

app.listen(port, () => {
    console.log(`The photography server is running on port : ${port}`);
})