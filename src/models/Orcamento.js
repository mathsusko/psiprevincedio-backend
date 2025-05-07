import mongoose from 'mongoose'

const OrcamentoSchema = new mongoose.Schema(
  {
    prestadorId: { type: mongoose.Types.ObjectId, ref: 'DadoPsi', required: true },
    clienteId: { type: mongoose.Types.ObjectId, ref: 'Cliente', required: true },
    custo: { type: Number, default: 0 },
    dataInicio: { type: Date, default: Date.now },
    dataSaida: { type: Date }
  },
  { timestamps: true }
)

export default mongoose.model('Orcamento', OrcamentoSchema)
