import express from 'express'
import {
  listarClientes,
  criarCliente,
  editarCliente,
  deletarCliente,
  obterClientePorId
} from '../../controllers/clientes/Cliente.controller.js'

const router = express.Router()

// Rota para listar todos os clientes
router.get('/', listarClientes)

// Rota para criar um novo cliente
router.post('/', criarCliente)

// Rota para editar um cliente
router.put('/:id', editarCliente)

// Rota para deletar um cliente
router.delete('/:id', deletarCliente)

// Rota para obter um cliente pelo ID
router.get('/:id', obterClientePorId) // Esta rota foi adicionada para trazer um cliente específico

export default router
