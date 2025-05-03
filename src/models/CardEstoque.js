import mongoose from 'mongoose'

const CardEstoqueSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    imagemUrl: { type: String, required: true },
    categoria: {
      type: String,
      enum: ['Un', 'Kg', 'Metros'], // Categoria com valores restritos
      required: true
    }
  },
  { timestamps: true }
)

const CardEstoque = mongoose.model('CardEstoque', CardEstoqueSchema)
export default CardEstoque
