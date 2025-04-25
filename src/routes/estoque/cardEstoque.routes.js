import express from 'express'
import {
  listarCards,
  criarCard,
  deletarCard,
  editarCard,
  editarItem,
} from '../../controllers/estoque/CardEstoque.controller.js'
import upload from '../../middleware/upload.js'
import { listarItensDoCard } from '../../controllers/estoque/CardEstoque.controller.js'
import { criarItemNoCard } from '../../controllers/estoque/CardEstoque.controller.js'

const router = express.Router()

// Definir as rotas
router.get('/', listarCards)
router.post('/', upload.single('imagem'), criarCard)
router.delete('/:id', deletarCard)
router.put('/:id', upload.single('imagem'), editarCard)
router.get('/:id/itens', listarItensDoCard)
router.post('/:id/itens', criarItemNoCard)
router.put('/cards/:cardId/itens/:itemId', editarItem) // Corrigindo para a rota de edição de item

export default router
