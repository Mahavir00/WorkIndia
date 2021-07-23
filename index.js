const express = require("express")

const userRouter = require('./routes/User.js')

const app = express();
app.use(express.json());


app.use('/', userRouter)


app.listen(3001, () => console.log("running server"));