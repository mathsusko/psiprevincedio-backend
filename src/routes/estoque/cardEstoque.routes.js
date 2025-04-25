
// src/routes/estoque/cardEstoque.routes.js
import express from 'express'
import {
  listarCards,
  criarCard,
  deletarCard,
  editarCard,
  listarItensDoCard,
  criarItemNoCard,
  editarItem,
  deletarItem,
} from '../../controllers/estoque/CardEstoque.controller.js'
import upload from '../../middleware/upload.js'

const router = express.Router()

router.get('/', listarCards)
router.post('/', upload.single('imagem'), criarCard)
router.delete('/:id', deletarCard)
router.put('/:id', upload.single('imagem'), editarCard)

router.get('/:id/itens', listarItensDoCard)
router.post('/:id/itens', criarItemNoCard)
router.put('/cards/:cardId/itens/:itemId', editarItem)
router.delete('/cards/:cardId/itens/:itemId', deletarItem)

export default router
