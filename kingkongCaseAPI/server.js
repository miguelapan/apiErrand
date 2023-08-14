const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://username:password@cluster1.2c0pvbr.mongodb.net/')

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('db is connected'))

app.use(express.json())

app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
)

const caseRouter = require('./routes/cases')
const commentsRouter = require('./routes/comments')

app.use('/cases', caseRouter)
app.use('/comments', commentsRouter)

app.listen(3000, () => console.log('server has started'))
