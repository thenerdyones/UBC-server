const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
let mongoURI = process.env.MONGO_URI

// middle ware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// schema 
const DataSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, 'must provide name'],

        },
        phone: Number,
        email: String,
        message: String,
})

// model
const Data = mongoose.model('Form', DataSchema)


// // controllers
// app.get('/api/v1/tasks', (req, res) => {

//         res.send('Get request received')
// })

app.post('/api/v1/tasks', async (req, res) => {
        try {
                const { name, phone, email, message } = req.body
                const newDataEntry = new Data({ name, phone, email, message })
                await newDataEntry.save()
                res.status(200).json(newDataEntry)
        } catch (error) {
                res.status(500).json({ msg: 'Error Adding to db', error })
        }
})

let startServer = async () => {
        try {
                await mongoose.connect(mongoURI)
                console.log('Connected to the Database Succesfully')

                // run server
                app.listen(port, () => {
                        console.log(`Server is listening on Port: ${port}`)
                })

        } catch (error) {
                console.error('Failed to Connect', error)
                process.exit(1)
        }
}

startServer()



/// your father wrote this code