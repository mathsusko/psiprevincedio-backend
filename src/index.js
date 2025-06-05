import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
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
import filiaisRoutes from './routes/clientes/filiais.routes.js'
import notasFiscaisRoutes from './routes/notas/notas.routes.js' // <-- NOVO IMPORT

const app = express()

// Middlewares globais
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Para suportar envio de form-data de campos

// Conexão com banco de dados
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('❌ Erro na conexão:', err))

// Servir arquivos públicos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas da API
app.use('/api/cards', cardRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/clientes', clientesRoutes)
app.use('/api/dadoPsi', dadoPsiRoutes)
app.use('/api/orcamentos', orcamentoRoutes)
app.use('/api/orcamento-items', orcamentoItemRoutes)
app.use('/api/funcionarios', funcionariosRoutes)
app.use('/api/funcionarios', horasRoutes)
app.use('/api/funcionarios', pagamentosRoutes)
app.use('/api/filiais', filiaisRoutes)
app.use('/api/notas', notasFiscaisRoutes) // <-- NOVA ROTA ADICIONADA

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Inicialização do servidor
app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3333}`)
})
