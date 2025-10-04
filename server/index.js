
import express from 'express'
import cors from 'cors'
import connectMongo from './db/db.js'

import authRouter from './routes/Auth.js'
import NoteRouter from './routes/Notes.js'


const app = express()
app.use(cors())
app.use(express.json()); 
app.use('/api/auth',authRouter)
app.use('/api/notes', NoteRouter)

app.listen(5000, () => {
    connectMongo()

    console.log("server is running")
})