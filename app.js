const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoutes')
const eventRouter = require('./routes/eventRoutes')
const vendorRouter=require('./routes/vendorRoutes')
const budgetRouter=require('./routes/budgetRoutes')
const bookingRouter = require('./routes/bookingRoutes');
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.use(morgan('dev'))

app.use(cookieParser())

app.use('/users', userRouter);

app.use('/events',eventRouter)

app.use('/vendors',vendorRouter)

app.use('/budgets',budgetRouter)

app.use('/bookings', bookingRouter);






console.log("connecting to mongodb..")

const config = require('./utils/config')

app.listen(3001, () => {
  console.log("Server is running on http://127.0.0.1:3001");
});

mongoose.connect(config.URI)
  .then(() => {
    console.log("Connected to MongoDB")

   
  }
  )
  .catch((e) => {
    console.log("Error connecting to MongoDB", e.message);
  })


