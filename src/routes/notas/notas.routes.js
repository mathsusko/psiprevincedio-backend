import express from 'express'
import upload from '../../middleware/upload.js'
import {
  criarNotaFiscal,
  listarNotasFiscais,
  deletarNotaFiscal
} from '../../controllers/notas/NotaFiscal.controller.js'

const router = express.Router()

// Rota para listar todas as notas fiscais
router.get('/', listarNotasFiscais)

// Rota para criar uma nova nota fiscal
router.post('/', upload.single('arquivo'), criarNotaFiscal) // Já está configurado para aceitar o arquivo

// Rota para deletar uma nota fiscal
router.delete('/:id', deletarNotaFiscal)

export default router
