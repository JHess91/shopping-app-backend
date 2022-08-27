import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('shopping-app')
const products = database.collection('products')

client.connect()
console.log('connected to mongo')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('API running on port 4040' ))

// Get 
app.get('/', async (req, res) => {
  const allProducts = await products.find().toArray()
  res.send(allProducts)
})

// Post
app.post('/', async (req, res) => {
  // const newProduct = { name: 'Miso', description: 'Miso Paste', price: 7.99, exp: 2030}
  console.log(req.body)
  await products.insertOne(req.body)
  res.send('Item Added')
})

// Delete
app.delete('/', async (req,res) => {
  await products.findOneAndDelete(req.query)
  res.json('Item was deleted')
})

// Put (Like a delete the like a post)
app.put('/', async (req, res) => {
  products.findOneAndUpdate(req.query, {$set: req.body})
  res.json('Item was updated with special field')
})