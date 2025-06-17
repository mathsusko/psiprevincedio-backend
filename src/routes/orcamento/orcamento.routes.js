import { Router } from 'express'
import {
  createOrcamento,
  getOrcamento,
  listOrcamentos,
  deleteOrcamento
} from '../../controllers/orcamento/Orcamento.controller.js'

const router = Router()
router.post('/', createOrcamento)
router.get('/', listOrcamentos)
router.get('/:id', getOrcamento)
router.delete('/:id', deleteOrcamento)

export default router
