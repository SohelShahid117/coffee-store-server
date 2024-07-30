const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!enJoy server site language.enJoy express JS')
})


//coffeeMaster
//D1fmdDONjSYcdZMZ
console.log(process.env.db_user)
console.log(process.env.db_pw)


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri ='mongodb://localhost:27017'
// const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pw}@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client.db("coffeeDB").collection("coffees");
    // const haiku = database.collection<Haiku>("haiku");
    
    //CREATE
    app.post('/coffee',async(req,res)=>{
      const newCoffee = req.body
      console.log(newCoffee)
      const result = await coffeeCollection.insertOne(newCoffee)
      res.send(result)
    })

    //READ
    app.get('/coffee',async(req,res)=>{
      const allCoffee = await coffeeCollection.find().toArray()
      console.log(allCoffee)
      res.send(allCoffee)
    })

    //DELETE
    app.delete('/coffee/:id',async(req,res)=>{
      const id = req.params.id
    //   const query = { title: "Annie Hall" };
    // const result = await movies.deleteOne(query);
    const query = {_id : new ObjectId(id)}
      const deleteCoffee = await coffeeCollection.deleteOne(query)
      console.log('delete',deleteCoffee)
      res.send(deleteCoffee)
    })

    //forUPDATE
    app.get('/coffee/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await coffeeCollection.findOne(query)
      console.log("update coffee-->",result)
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`my server is running at http:localhost:${port}`)
  console.log(`Example app listening on port ${port}`)
})