import mongoose from 'mongoose'

const FuncionarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cargo: { type: String, required: true },
    telefone: { type: String },
    dataAdmissao: { type: Date, default: Date.now },
    ativo: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Funcionario', FuncionarioSchema)
