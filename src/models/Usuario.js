import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, default: 'admin' }
})

export default mongoose.model('Usuario', usuarioSchema)
