const { MongoClient, ServerApiVersion } = require('mongodb');
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

}

run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('Photography website server running');
})

app.listen(port, () => {
    console.log(`The photography server is running on port : ${port}`);
})