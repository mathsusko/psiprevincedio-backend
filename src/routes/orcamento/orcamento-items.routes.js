import { Router } from 'express'
import { createItem } from '../../controllers/orcamento/OrcamentoItem.controller.js'

const router = Router()

// CRUD mínimo para criar item de orçamento
router.post('/', createItem)
// As rotas de listagem, edição e exclusão de itens podem ser adicionadas conforme necessário
// router.get('/',    listItems)      // útil para listar todos
// router.get('/:id', getItemById)   // útil para editar
// router.delete('/:id', deleteItem) // opcional

export default router
