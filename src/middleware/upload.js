import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Corrige __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Definir o diretório de destino para os uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Usar caminho absoluto para o diretório de uploads
    cb(null, path.join(__dirname, '../uploads')) // Caminho correto para desenvolvimento
  },
  filename: (req, file, cb) => {
    // Usar o timestamp + nome original do arquivo
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// Filtrando tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

  // Usar path.extname para verificar a extensão do arquivo
  const fileExtension = path.extname(file.originalname).toLowerCase()

  if (
    allowedTypes.includes(file.mimetype) &&
    ['.jpg', '.jpeg', '.png', '.webp', '.pdf'].includes(fileExtension)
  ) {
    cb(null, true)
  } else {
    cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`), false)
  }
}

// Configuração do Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // Limite de 20MB para upload
})

export default upload
