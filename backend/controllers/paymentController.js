const stripe = require("../services/stripe");

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pkr", // Change to your desired currency
      payment_method_types: ["card"],
    });

    // Send the client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
    console.log(paymentIntent.client_secret); // Log the client secret for debugging
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
