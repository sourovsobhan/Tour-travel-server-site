const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env
	.DB_PASS}@cluster0.gdcqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		await client.connect();
		const database = client.db('tourtravel');
		const usersCollection = database.collection('users');
		const ordersCollection = database.collection('orders');
		// get api
		app.get('/users', async (req, res) => {
			const cursor = usersCollection.find({});
			const user = await cursor.toArray();
			res.send(user);
		});

		app.get('/book', async (req, res) => {
			const cursor = ordersCollection.find({});
			const user = await cursor.toArray();
			res.send(user);
		});

		app.get('/book/:email', async (req, res) => {
			const { email } = req.params;

			const cursor = ordersCollection.find({ email: email });
			const user = await cursor.toArray();
			res.send(user);
		});
		// delete api
		app.delete('/book/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await ordersCollection.deleteOne(query);
			console.log('deleting id', result);
			res.json(result);
		});

		// post api
		app.post('/users', async (req, res) => {
			const newUser = req.body;
			const result = await usersCollection.insertOne(newUser);

			console.log('got new user', req.body);
			console.log('added user', result);
			res.json(result);
		});
		//book post api
		app.post('/booknow', async (req, res) => {
			const newUser = req.body;
			const result = await ordersCollection.insertOne(newUser);

			console.log('got new user', req.body);
			console.log('added user', result);
			res.json(result);
		});

		// book api
		app.get('/users/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const cursor = usersCollection.find(query);
			const user = await cursor.toArray();
			res.json(user);
		});
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('my backhend  link ddd');
});

app.listen(port, () => {
	console.log(` listening at http://localhost:${port}`);
});
