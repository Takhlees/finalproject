const stripe = require('../services/stripe');

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'pkr', // Change to your desired currency
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
