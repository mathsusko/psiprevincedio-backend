import express from 'express'
import {
  listarHorasPorFuncionario,
  criarHora,
  atualizarHora,
  deletarHora
} from '../../controllers/funcionarios/Horas.controller.js'

const router = express.Router()

// /api/funcionarios/:id/horas
router.get('/:id/horas', listarHorasPorFuncionario)
router.post('/:id/horas', criarHora)
router.put('/horas/:horaId', atualizarHora)
router.delete('/horas/:horaId', deletarHora)

export default router
