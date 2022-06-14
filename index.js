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

        // GET API 
        app.get('/users', async (req, res) => {
            const usersData = users.find({});
            const allUser = await usersData.toArray();
            res.send(allUser);
        })

        // POST API
        app.post('/users', async (req, res) => {
            if (req.body.name && req.body.email) {
                const result = await users.insertOne(req.body);
                console.log('hitting the post', req.body);
                res.json(result);
            }
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