const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51K4gDTKVUoLX2yMsLlvJzoPApRTHay0jUIeTBIPLOSjytuDpA3jdp7XX4ROV7GWp32aGITO3ER3awtm5r9XmQG0z00yRFR6aeT');


// api

// api config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get("/", (request, response) => response.status(200).send("hello words"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log('Payment request received ==>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});
// listen command
exports.api = functions.https.onRequest(app);
