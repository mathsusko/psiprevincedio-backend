import express from 'express'
import {
  listarCards,
  criarCard,
  deletarCard,
  editarCard
} from '../../controllers/estoque/CardEstoque.controller.js'
import upload from '../../middleware/upload.js'

const router = express.Router()

router.get('/', listarCards)
router.post('/', upload.single('imagem'), criarCard)
router.delete('/:id', deletarCard)
router.put('/:id', upload.single('imagem'), editarCard) // <- ESSA LINHA É IMPORTANTE

export default router
