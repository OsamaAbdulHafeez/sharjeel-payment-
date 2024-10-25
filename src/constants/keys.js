import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config()

const key = process.env.STRIPE_KEY
const stripe = new Stripe(key);


export { stripe }