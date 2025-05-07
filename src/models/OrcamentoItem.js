import mongoose from 'mongoose'

const OrcamentoItemSchema = new mongoose.Schema(
  {
    orcamentoId: { type: mongoose.Types.ObjectId, ref: 'Orcamento', required: true },
    materialId: { type: mongoose.Types.ObjectId, ref: 'CardEstoque', required: true },
    nome: { type: String, required: true },
    medida: { type: String, required: true },
    quantidade: { type: Number, required: true },
    precoUn: { type: Number, required: true },
    imagem: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('OrcamentoItem', OrcamentoItemSchema)
