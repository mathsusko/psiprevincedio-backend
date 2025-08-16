import Documento from '../../models/Documento.js' // Importação com ESM
import path from 'path'
import fs from 'fs'

// Função para upload de documentos
export const uploadDocumento = async (req, res) => {
  try {
    const { clienteId } = req.params
    const { descricao } = req.body // Descrição do documento
    const file = req.file

    // Verificar se o arquivo foi enviado
    if (!file) {
      return res.status(400).json({ message: 'Arquivo não enviado' })
    }

    const url = `/uploads/documentos/${file.filename}`

    // Criação do documento no banco de dados
    const documento = await Documento.create({
      clienteId,
      descricao,
      url
    })

    res.status(201).json(documento) // Retorna o documento criado
  } catch (error) {
    console.error('Erro no upload:', error)
    res.status(500).json({ message: 'Erro ao enviar o documento' })
  }
}

// Função para buscar documentos de um cliente
export const getDocumentosCliente = async (req, res) => {
  try {
    const { clienteId } = req.params
    const documentos = await Documento.find({ clienteId }).sort({ createdAt: -1 })

    res.json(documentos)
  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    res.status(500).json({ message: 'Erro ao buscar documentos' })
  }
}

// Função para deletar um documento
export const deleteDocumento = async (req, res) => {
  try {
    const { documentoId } = req.params

    const documento = await Documento.findByIdAndDelete(documentoId)

    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' })
    }

    const filePath = path.join(
      __dirname,
      '../../uploads/documentos',
      path.basename(documento.url)
    )
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    res.json({ message: 'Documento deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar documento:', error)
    res.status(500).json({ message: 'Erro ao deletar documento' })
  }
}

// Função para atualizar a descrição do documento
export const updateDescricao = async (req, res) => {
  try {
    const { documentoId } = req.params
    const { descricao } = req.body // Nova descrição

    if (!descricao) {
      return res.status(400).json({ message: 'Descrição é necessária' })
    }

    const documento = await Documento.findByIdAndUpdate(
      documentoId,
      { descricao },
      { new: true } // Retorna o documento atualizado
    )

    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' })
    }

    res.json(documento)
  } catch (error) {
    console.error('Erro ao atualizar descrição:', error)
    res.status(500).json({ message: 'Erro ao atualizar descrição' })
  }
}
