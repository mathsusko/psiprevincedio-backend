// src/routes/estoque/cardEstoque.routes.js
import express from 'express'
import {
  listarCards,
  criarCard,
  deletarCard,
  editarCard,
  listarCardsPorCategoria // Importe a nova função corretamente
} from '../../controllers/estoque/CardEstoque.controller.js' // A importação agora está correta
import {
  listarItensDoCard,
  criarItemNoCard,
  editarItem,
  deletarItem,
  atualizarQuantidadeItem
} from '../../controllers/estoque/ItemCard.controller.js'
import upload from '../../middleware/upload.js'

const router = express.Router()

// Rotas para cards
router.get('/', listarCards)
router.post('/', upload.single('imagem'), criarCard)
router.delete('/:id', deletarCard)
router.put('/:id', upload.single('imagem'), editarCard)

// Rota personalizada para listar cards por categoria
router.get('/por-categoria', listarCardsPorCategoria) // Definição da rota corretamente aqui

// Rotas para itens dentro de um card
router.get('/:id/itens', listarItensDoCard) // Listar itens de um card
router.post('/:id/itens', criarItemNoCard) // Criar item dentro de um card
router.put('/:cardId/itens/:itemId', editarItem) // Editar item
router.delete('/:cardId/itens/:itemId', deletarItem) // Deletar item
router.patch('/:cardId/itens/:itemId', atualizarQuantidadeItem) // Atualizar quantidade

export default router
