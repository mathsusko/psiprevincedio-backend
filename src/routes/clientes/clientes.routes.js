import express from 'express'
import {
  listarClientes,
  criarCliente,
  obterClientePorId,
  editarCliente,
  deletarCliente
} from '../../controllers/clientes/Cliente.controller.js'

const router = express.Router()

// Rotas para clientes
router.get('/', listarClientes)
router.get('/:id', obterClientePorId)
router.post('/', criarCliente)
router.put('/:id', editarCliente)
router.delete('/:id', deletarCliente)

export default router

