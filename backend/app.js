const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 4000


app.use(cors())

app.use(express.json())
//Available routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/rooms', require('./routes/roomRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/employees', require('./routes/employeeRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))

app.listen(port, ()=> {
  console.log(`finalproject backend listening at http://localhost:${port}`)
})
