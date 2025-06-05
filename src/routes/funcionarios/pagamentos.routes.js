import express from 'express'
import {
  listarPagamentos,
  criarPagamento,
  atualizarPagamento,
  deletarPagamento
} from '../../controllers/funcionarios/Pagamento.controller.js'

const router = express.Router()

// /api/funcionarios/:id/pagamentos
router.get('/:id/pagamentos', listarPagamentos)
router.post('/:id/pagamentos', criarPagamento)
router.put('/pagamentos/:pagamentoId', atualizarPagamento)
router.delete('/pagamentos/:pagamentoId', deletarPagamento)

export default router
