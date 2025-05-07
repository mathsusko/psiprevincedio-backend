import { Router } from 'express'
import { createItem } from '../../controllers/orcamento/OrcamentoItem.controller.js'

const router = Router()

// CRUD mínimo
router.post('/', createItem)
// router.get('/',    listItems)      // útil para listar todos
// router.get('/:id', getItemById)   // útil para editar
// router.delete('/:id', deleteItem) // opcional

export default router
