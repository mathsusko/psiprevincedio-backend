import mongoose from 'mongoose'

const HoraTrabalhadaSchema = new mongoose.Schema(
  {
    funcionarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcionario',
      required: true
    },
    titulo: String,
    descricao: String,
    inicio: Date,
    fim: Date
  },
  { timestamps: true }
)

export default mongoose.model('HoraTrabalhada', HoraTrabalhadaSchema)
