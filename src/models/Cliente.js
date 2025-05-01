import mongoose from 'mongoose'

const ClienteSchema = new mongoose.Schema(
  {
    nomeEmpresa: { type: String, required: true },
    cnpjCpf: { type: String, required: true, unique: true },
    endereco: { type: String, required: true },
    numeroEndereco: { type: String, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    categoria: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Cliente = mongoose.model('Cliente', ClienteSchema)
export default Cliente
