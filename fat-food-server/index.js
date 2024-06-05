const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51PNpAdHm1IjJVAvYssSn2pgM0srTrNGokYWFfdNB0vS9SiGQlPbcB3FfJjulredUVpLKWdfuy4DTjpwjwyxsVms800LPLqqQwx');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
require('dotenv').config();
const port = process.env.PORT || 5000;


// middle were
app.use(cors())
app.use(express.static("public"));
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.lnhi9o9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        //creating a database and collection in th database, coffee data collection
        const menuCollection = client.db("foodDB").collection("menu");
        // user data collection
        const reviewCollection = client.db("foodDB").collection("review");

        const cardsCollection = client.db("foodDB").collection("cards");
        const userCollection = client.db("foodDB").collection("users");
        const paymentCollection = client.db("foodDB").collection("payments");


        // send token api 
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.Access_Token, { expiresIn: '5h' });
            res.send({ token })
        })

        // token verification middle-were
        const verifyToken = (req, res, next) => {
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'Unauthorize Access' })
            }
            const token = req.headers.authorization.split(' ')[1];
            // console.log("The token is: ", token);
            jwt.verify(token, process.env.Access_Token, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'Unauthorize Access' })
                }
                req.decoded = decoded
                next()
            });
        }

        // Admin verification middle-were
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query)
            const isAdmin = user?.role === "admin";
            if (!isAdmin) {
                return res.status(403).send({ message: "Forbidden Access" })
            }
            next();
        }

        // all users api
        app.get('/all-users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })


        // admin user api
        app.get('/user-admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            // check the user email and decoded email from verifyToken are same or not (ultimately both email are same)
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            };
            const query = { email: email }
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === "admin";
            }
            res.send({ admin })
        })


        // user related api for social singin 
        app.post('/create-user', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const axisestingUserEmail = await userCollection.findOne(query);
            if (axisestingUserEmail) {
                return res.send({ message: "User already exists", insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // delete a user
        app.delete('/delete-user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

        // make a user Admin api
        app.patch('/make/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: "admin"
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result)
        })

        // api for all food item
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })

        // api for all review 
        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result)
        })

        // post ordered item in the DB
        app.post('/cards', async (req, res) => {
            const cardsItem = req.body;
            const result = await cardsCollection.insertOne(cardsItem)
            res.send(result);
        })

        // get all ordered items api
        app.get('/cards', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await cardsCollection.find(query).toArray();
            res.send(result)
        });

        // delete item api
        app.delete('/delete-card/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cardsCollection.deleteOne(query)
            res.send(result)
        })

        // add food itme api
        app.post('/add-menu-item', verifyToken, verifyAdmin, async (req, res) => {
            const item = req.body;
            const result = await menuCollection.insertOne(item)
            res.send(result)
        })

        // stripe related codes
        app.post("/create-payment-intent", async (req, res) => {
            const { price } = req.body;
            const toatlAmount = parseInt(price * 100)

            // console.log("Total amount", toatlAmount);


            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: toatlAmount,
                currency: "usd",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });

        // set paid itme with detail to db
        app.post('/payments', async (req, res) => {
            const paymentDetail = req.body;
            console.log("data from paid items", paymentDetail);
            const result = await paymentCollection.insertOne(paymentDetail)
            res.send(result)
        })














        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Fat Food")
})

app.listen(port, () => {
    console.log("Bistro Boss - Fat food in runing on port", port);
})