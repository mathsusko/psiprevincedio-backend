import { Router } from 'express'
import {
  createOrcamento,
  getOrcamento,
  listOrcamentos
} from '../../controllers/orcamento/Orcamento.controller.js'

const router = Router()
router.post('/', createOrcamento)
router.get('/', listOrcamentos)
router.get('/:id', getOrcamento)
export default router
