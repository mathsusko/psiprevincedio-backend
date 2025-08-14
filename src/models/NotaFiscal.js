import mongoose from 'mongoose'

const notaFiscalSchema = new mongoose.Schema(
  {
    clienteNome: { type: String, required: true },
    descricao: { type: String },
    dataRecebimento: { type: Date },
    caminhoArquivo: { type: String, required: true },
    filialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true } // ✅ ref atualizado para 'Cliente' que armazena as filiais
  },
  { timestamps: true }
)

const NotaFiscal = mongoose.model('NotaFiscal', notaFiscalSchema)

export default NotaFiscal
