import mongoose from 'mongoose'

const ClienteSchema = new mongoose.Schema(
  {
    nomeEmpresa: { type: String, required: true },
    cnpjCpf: { type: String },
    endereco: { type: String },
    numeroEndereco: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cep: { type: String },
    cidade: { type: String },
    estado: { type: String },
    email: { type: String },
    telefone: { type: String },
    categoria: { type: String },
    ie: { type: String },

    // ⚠️ NOVO: campo opcional usado para vincular filiais
    clientePaiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      default: null
    }
  },
  { timestamps: true }
)

const Cliente = mongoose.model('Cliente', ClienteSchema)
export default Cliente
