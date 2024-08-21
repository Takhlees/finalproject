const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Make sure to set your Stripe secret key in environment variables

module.exports = stripe;
