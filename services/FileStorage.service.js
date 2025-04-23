// src/services/FileStorage.service.js
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

module.exports = {
  upload: (file) => {
    const ext = path.extname(file.originalname)
    const filename = `${uuidv4()}${ext}`
    const filepath = path.join(uploadDir, filename)

    return new Promise((resolve, reject) => {
      fs.rename(file.path, filepath, (err) => {
        if (err) reject(err)
        resolve(`/uploads/${filename}`)
      })
    })
  },

  deletar: (url) => {
    const filename = path.basename(url)
    const filepath = path.join(uploadDir, filename)

    return new Promise((resolve) => {
      fs.unlink(filepath, () => resolve(true))
    })
  }
}
