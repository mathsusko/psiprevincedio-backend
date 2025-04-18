import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js'

dotenv.config()
connectDatabase()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
