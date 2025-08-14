import express from 'express'
import {
  listarFuncionarios,
  obterFuncionario,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} from '../../controllers/funcionarios/Funcionario.controller.js'

const router = express.Router()

// Listar todos os funcionários
router.get('/', listarFuncionarios)

// Obter funcionário por ID
router.get('/:id', obterFuncionario)

// Criar novo funcionário
router.post('/', criarFuncionario)

// Atualizar funcionário
router.put('/:id', atualizarFuncionario)

// Deletar funcionário
router.delete('/:id', deletarFuncionario)

export default router
