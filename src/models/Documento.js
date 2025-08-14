import mongoose from 'mongoose'

const DocumentoSchema = new mongoose.Schema(
  {
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    descricao: { type: String, required: true }, // Apenas 'descricao' agora
    url: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('Documento', DocumentoSchema)
