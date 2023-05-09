import express from 'express'
import 'dotenv/config'
import './database/conection.db'
import authRoutes from './routes/auth.route'

const app = express()
const PORT = process.env.PORT!

app.use(express.json())
app.use('/api/v1/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log('Funcionando en el puerto', PORT)
})