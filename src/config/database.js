import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // Carrega as variáveis do arquivo .env

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI // Obtém a URI do MongoDB do arquivo .env
    if (!uri) {
      throw new Error('A URI do MongoDB não foi definida!')
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conexão com MongoDB estabelecida com sucesso!')
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message)
  }
}

export default connectDatabase
