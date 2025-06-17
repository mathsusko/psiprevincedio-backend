import mongoose from 'mongoose'

const notaFiscalSchema = new mongoose.Schema(
  {
    clienteNome: { type: String, required: true },
    descricao: { type: String },
    dataRecebimento: { type: Date },
    caminhoArquivo: { type: String, required: true },
    filialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Filial', required: true } // Adicionando a associação com a filial
  },
  {
    timestamps: true
  }
)

const NotaFiscal = mongoose.model('NotaFiscal', notaFiscalSchema)

export default NotaFiscal
