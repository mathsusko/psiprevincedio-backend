import express from 'express'
import {
  listarDadoPsi,
  criarDadoPsi,
  editarDadoPsi,
  deletarDadoPsi,
  obterDadoPsiPorId
} from '../../controllers/dadoPsi/DadoPsi.controller.js'

const router = express.Router()

// Rota para listar todos os dados da empresa (dona do sistema)
router.get('/', listarDadoPsi)

// Rota para criar um novo dadoPsi
router.post('/', criarDadoPsi)

// Rota para editar um dadoPsi
router.put('/:id', editarDadoPsi)

// Rota para deletar um dadoPsi
router.delete('/:id', deletarDadoPsi)

// Rota para obter um dadoPsi pelo ID
router.get('/:id', obterDadoPsiPorId)

export default router
