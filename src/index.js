// src/server.js
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

// Configuração do __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import cardRoutes from './routes/estoque/cardEstoque.routes.js'
import authRoutes from './routes/auth.routes.js'
import testRoutes from './routes/test.routes.js'
import clientesRoutes from './routes/clientes/clientes.routes.js'
import dadoPsiRoutes from './routes/dadoPsi/dadoPsi.routes.js'

const app = express()

// Middlewares globais
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // <-- ESSENCIAL para ler `form-data` de campos de texto

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('❌ Erro na conexão:', err))

// Rotas
app.use('/api/cards', cardRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/clientes', clientesRoutes)
app.use('/api/dadoPsi', dadoPsiRoutes)

// Servir arquivos estáticos (como imagens) da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Inicialização do servidor
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`)
})
