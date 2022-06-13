const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://mydbuser2:iXq3cDQmQSxiXHqL@cluster0.zqquk.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("exercise-2");
        const users = database.collection("find");

        // POST API
        app.post('/users', async (req, res) => {
            console.log('hitting the post');
            res.send('hit the post');
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log('listening to port,', port);
})

// mydbuser2
// iXq3cDQmQSxiXHqL