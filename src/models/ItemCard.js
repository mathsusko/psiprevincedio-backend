import mongoose from 'mongoose'

const itemCardSchema = new mongoose.Schema(
  {
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CardEstoque',
      required: true,
    },
    codigo: String,
    descricao: String,
    medida: String,
    ncm: String,
    codigoFabrica: String,
    quantidade: Number,
    precoUnitario: Number,
    custoTotal: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('ItemCard', itemCardSchema)
