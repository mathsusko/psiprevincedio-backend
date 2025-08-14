import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Corrige __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define o diretório de destino específico para documentos
const dir = path.join(__dirname, '../uploads/documentos')

// Cria o diretório se não existir
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir) // Diretório para armazenar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// Filtra tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword'
  ]
  const fileExtension = path.extname(file.originalname).toLowerCase()

  if (
    allowedTypes.includes(file.mimetype) &&
    ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.doc', '.docx'].includes(fileExtension)
  ) {
    cb(null, true)
  } else {
    cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`), false)
  }
}

// Cria o middleware multer
const uploadDocumento = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
})

export default uploadDocumento
