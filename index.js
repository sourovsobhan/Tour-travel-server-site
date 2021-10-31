const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = 5000;

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

		const doc = {
			name: 'speacial person',
			email: 'special@gmail.com'
		};
		const result = await usersCollection.insertOne(doc);
		console.log(`A document was inserted with the _id: ${result.insertedId}`);

		// post api
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('my backhend  link ddd');
});

app.listen(port, () => {
	console.log(` listening at http://localhost:${port}`);
});
