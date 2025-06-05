import express from 'express'
import {
  listarClientes,
  criarCliente,
  editarCliente,
  deletarCliente,
  obterClientePorId,
  listarFiliaisPorClientePai
} from '../../controllers/clientes/Cliente.controller.js'

const router = express.Router()

router.get('/', listarClientes)
router.post('/', criarCliente)
router.put('/:id', editarCliente)
router.delete('/:id', deletarCliente)
router.get('/:id', obterClientePorId)
router.get('/filiais/:clientePaiId', listarFiliaisPorClientePai)

export default router
