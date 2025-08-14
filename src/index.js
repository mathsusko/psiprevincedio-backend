import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

// Corrigir __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Importação de rotas
import cardRoutes from './routes/estoque/cardEstoque.routes.js'
import authRoutes from './routes/auth.routes.js'
import testRoutes from './routes/test.routes.js'
import clientesRoutes from './routes/clientes/clientes.routes.js'
import dadoPsiRoutes from './routes/dadoPsi/dadoPsi.routes.js'
import orcamentoRoutes from './routes/orcamento/orcamento.routes.js'
import orcamentoItemRoutes from './routes/orcamento/orcamento-items.routes.js'
import funcionariosRoutes from './routes/funcionarios/funcionarios.routes.js'
import horasRoutes from './routes/funcionarios/horas.routes.js'
import pagamentosRoutes from './routes/funcionarios/pagamentos.routes.js'
import notasFiscaisRoutes from './routes/notas/notas.routes.js'

import documentosRoutes from './routes/documentos/documentos.routes.js' // Adicionado

import autenticar from './middleware/auth.js' // Certifique-se de que o caminho está correto

const app = express()

// Middlewares globais
app.use(
  cors({
    origin: [process.env.FRONTEND_DEV_URL, process.env.FRONTEND_PROD_URL], // URLs de desenvolvimento e produção
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Para suportar envio de form-data de campos

// Conexão com banco de dados
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('❌ Erro na conexão:', err))

// Servir arquivos públicos (ajustado para documentos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas da API
app.use('/api/cards', cardRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/clientes', clientesRoutes)
app.use('/api/dadoPsi', dadoPsiRoutes)
app.use('/api/orcamentos', orcamentoRoutes)
app.use('/api/orcamento-items', orcamentoItemRoutes)
app.use('/api/funcionarios', funcionariosRoutes) // Rota principal de funcionários
app.use('/api/funcionarios/horas', horasRoutes) // Rota para horas dos funcionários
app.use('/api/funcionarios/pagamentos', pagamentosRoutes) // Rota para pagamentos dos funcionários
app.use('/api/notas', notasFiscaisRoutes) // Rota de notas fiscais

// Rota de documentos
app.use('/api/documentos', documentosRoutes) // <-- Ajuste na rota de documentos

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

app.get('/api/auth/dashboard', autenticar, (req, res) => {
  res.json({
    msg: 'Acesso ao dashboard autorizado',
    usuario: req.usuario
  })
})

// Inicialização do servidor
app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3333}`)
})
