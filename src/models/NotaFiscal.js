// src/models/NotaFiscal.js
import mongoose from 'mongoose'

const notaFiscalSchema = new mongoose.Schema(
  {
    nomeEmpresa: { type: String, required: true },
    descricao: { type: String },
    dataRecebimento: { type: Date },
    caminhoArquivo: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const NotaFiscal = mongoose.model('NotaFiscal', notaFiscalSchema)

export default NotaFiscal
