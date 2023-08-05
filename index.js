const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

//peconalok
//4gbQBJkSedYcfLdN

// mongodb code start
const uri =
  "mongodb+srv://peconalok:4gbQBJkSedYcfLdN@cluster0.1t2lj4i.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create db
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // All API
    //get users
    // Query for a movie that has the title 'The Room'
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // post user
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// get post put delete apis
app.get("/", (req, res) => {
  res.send("Simple CRUD is running");
});

// start server
app.listen(port, () => {
  console.log(`Simple CRUD is running on port ${port}`);
});
