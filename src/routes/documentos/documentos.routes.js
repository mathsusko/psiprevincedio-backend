import express from 'express'
import uploadDocumentos from '../../middleware/documentos.js' // Middleware para upload de arquivo
import * as documentoController from '../../controllers/documentos/documento.controller.js'

const router = express.Router()

// Rota para upload de documentos
router.post(
  '/upload/:clienteId',
  uploadDocumentos.single('file'),
  documentoController.uploadDocumento
)

// Rota para pegar documentos de um cliente
router.get('/:clienteId', documentoController.getDocumentosCliente)

// Rota para atualizar a descrição de um documento
router.put('/:documentoId', documentoController.updateDescricao)

// Rota para deletar um documento
router.delete('/:documentoId', documentoController.deleteDocumento)

export default router
