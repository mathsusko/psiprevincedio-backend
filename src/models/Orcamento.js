import mongoose from 'mongoose'

const OrcamentoSchema = new mongoose.Schema(
  {
    prestadorId: {
      type: mongoose.Types.ObjectId,
      ref: 'DadoPsi', // Referência ao prestador
      required: true
    },
    clienteId: {
      type: mongoose.Types.ObjectId,
      ref: 'Cliente', // Alterado para Cliente ao invés de Filial
      required: true
    },
    custo: {
      type: Number,
      default: 0
    },
    dataInicio: {
      type: Date,
      default: Date.now
    },
    dataSaida: {
      type: Date
    },
    descricaoServico: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

export default mongoose.model('Orcamento', OrcamentoSchema)
