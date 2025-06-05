import express from 'express'
import {
  listarFuncionarios,
  obterFuncionario,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} from '../../controllers/funcionarios/Funcionario.controller.js'

const router = express.Router()

router.get('/', listarFuncionarios)
router.get('/:id', obterFuncionario)
router.post('/', criarFuncionario)
router.put('/:id', atualizarFuncionario)
router.delete('/:id', deletarFuncionario)

export default router
