import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { corsConfig } from './src/config/corsConfig.js'
import connectDB from './src/config/databaseConfig.js'
import router from './src/routes/router.js';

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(cors(corsConfig))
app.use(express.json())
app.use(router)


app.get('/api_testify/v1/health', (req, res) => {
    res.status(200).send('API testify runing healthy')
})



app.listen(port, ()=> {
    console.log(`El servidor se ejecuta en el puerto ${port}`);
})