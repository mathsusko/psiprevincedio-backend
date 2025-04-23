// src/routes/test.routes.js
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Rota de teste funcionando!' })
})

export default router // ← Exportação ESSENCIAL
