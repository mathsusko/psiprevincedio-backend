import express from 'express'
import upload from '../../middleware/upload.js'
import {
  criarNotaFiscal,
  listarNotasFiscais,
  deletarNotaFiscal
} from '../../controllers/notas/NotaFiscal.controller.js'

const router = express.Router()

router.get('/', listarNotasFiscais)
router.post('/', upload.single('arquivo'), criarNotaFiscal)
router.delete('/:id', deletarNotaFiscal)

export default router
