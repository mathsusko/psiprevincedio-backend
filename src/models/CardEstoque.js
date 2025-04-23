import mongoose from 'mongoose'

const CardEstoqueSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    imagemUrl: { type: String, required: true },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: false
    }
  },
  { timestamps: true }
)

const CardEstoque = mongoose.model('CardEstoque', CardEstoqueSchema)
export default CardEstoque
