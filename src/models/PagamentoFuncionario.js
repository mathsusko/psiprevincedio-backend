import mongoose from 'mongoose'

const PagamentoFuncionarioSchema = new mongoose.Schema(
  {
    funcionarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcionario',
      required: true
    },
    mesReferencia: String, // '2025-05'
    valor: Number,
    status: { type: String, enum: ['pendente', 'pago'], default: 'pendente' },
    dataPagamento: Date
  },
  {
    timestamps: true
  }
)

export default mongoose.model('PagamentoFuncionario', PagamentoFuncionarioSchema)
