const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMongo();
const app = express()
const port = 4000


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));


app.use(express.json())
//Available routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/rooms', require('./routes/roomRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/employees', require('./routes/employeeRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))
app.use('/api/payment', require('./routes/paymentRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.listen(port, ()=> {
  console.log(`finalproject backend listening at http://localhost:${port}`)
})
