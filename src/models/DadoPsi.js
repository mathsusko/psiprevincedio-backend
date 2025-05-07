import mongoose from 'mongoose'

// Esquema para armazenar as informações da empresa (dona do sistema)
const DadoPsiSchema = new mongoose.Schema(
  {
    nomeEmpresa: {
      type: String,
      required: true
    },
    cnpj: {
      type: String, // Alterado para String e não mais array
      required: true,
      unique: true // Garante que o CNPJ será único
    },
    endereco: {
      type: String,
      required: true
    },
    numeroEndereco: {
      type: String,
      required: true
    },
    complemento: {
      type: String
    },
    bairro: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    categoria: {
      type: String, // Pode ser 'Matriz', 'Filial', etc.
      required: true
    },
    ie: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('DadoPsi', DadoPsiSchema)
