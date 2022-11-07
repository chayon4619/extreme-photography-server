const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

// middle ware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Photography website server running');
})

app.listen(port, () => {
    console.log(`The photography server is running on port : ${port}`);
})