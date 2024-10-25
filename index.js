import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';

dotenv.config()

// Middleware
const allowedOrigins = [
    'https://stripe-frontend-blush.vercel.app',
    'http://localhost:5173',
];

// it allow to all origin what to get call.
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// app.use(cors((req, callback) => {
//     const origin = req.header('Origin');
//     if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true); // Allow the origin
//     } else {
//         callback(new Error('Not allowed by CORS')); // Reject the origin
//     }
// }));


const port = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() =>
        console.log("---- Connected to MongoDB ----")
    )
    .catch((err) =>
        console.log("---- Error Connected MongoDB ----", err)
    );

app.use("/api", routes);
app.get("/", (req, res) => res.status(200).json({ success: true, message: "API IS RUNNING ON THIS PORT " + port }))
app.get("*", (req, res) => res.status(400).json({ success: false, message: "THIS ROUTE IS INVALID PLEASE RETRY WITH CORRRECT ROUTE" }))


// Start the server
app.listen(port, () => console.log('Server running on port ' + port));
