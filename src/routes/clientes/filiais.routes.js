import express from 'express'
import {
  listarFiliais,
  criarFilial,
  editarFilial,
  deletarFilial,
  obterFilialPorId
} from '../../controllers/clientes/Filial.controller.js'

const router = express.Router()

// Listar todas as filiais vinculadas a um cliente pai
router.get('/:clientePaiId', listarFiliais)

// Obter dados de uma filial específica
router.get('/filial/:id', obterFilialPorId)

// Criar nova filial
router.post('/', criarFilial)

// Atualizar filial
router.put('/:id', editarFilial)

// Remover filial
router.delete('/:id', deletarFilial)

export default router
