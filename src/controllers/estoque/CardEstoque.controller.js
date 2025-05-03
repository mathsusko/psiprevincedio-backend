// src/controllers/estoque/CardEstoque.controller.js
import CardEstoque from '../../models/CardEstoque.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Corrige __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Listar os cards
export const listarCards = async (req, res) => {
  try {
    const cards = await CardEstoque.find().sort({ createdAt: -1 })
    res.status(200).json(cards)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Criar novo card
export const criarCard = async (req, res) => {
  const { nome, categoria } = req.body
  const imagem = req.file

  if (!imagem) {
    return res.status(400).json({ success: false, error: 'A imagem é obrigatória!' })
  }

  try {
    const imagemUrl = `/uploads/${imagem.filename}` // URL para acesso público
    const novoCard = await CardEstoque.create({ nome, categoria, imagemUrl })
    return res.status(201).json({ success: true, data: novoCard })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

// Editar card
export const editarCard = async (req, res) => {
  const { id } = req.params
  const { nome } = req.body // Apenas nome será editável
  const imagemUrl = req.file ? `/uploads/${req.file.filename}` : undefined // Verifica se há nova imagem

  try {
    const card = await CardEstoque.findById(id)
    if (!card) {
      return res.status(404).json({ success: false, error: 'Card não encontrado' })
    }

    card.nome = nome || card.nome // Se nome for alterado, atualiza
    card.imagemUrl = imagemUrl || card.imagemUrl // Se imagem for alterada, atualiza

    // A categoria será sempre "Un", se necessário, defina no código diretamente
    card.categoria = 'Un' // Categoria fixa, sem alteração

    await card.save()
    return res.status(200).json({ success: true, data: card })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

// Deletar card
export const deletarCard = async (req, res) => {
  const { id } = req.params

  try {
    const card = await CardEstoque.findById(id)
    if (!card) {
      return res.status(404).json({ success: false, error: 'Card não encontrado' })
    }

    // Verifique se a imagem existe antes de tentar excluir
    if (card.imagemUrl) {
      const imagemPath = path.join(__dirname, '..', card.imagemUrl) // Certifique-se de usar o caminho correto

      // Verifique se o arquivo existe antes de tentar removê-lo
      if (fs.existsSync(imagemPath)) {
        fs.unlinkSync(imagemPath) // Remove o arquivo
      }
    }

    // Após remover a imagem, exclua o card do banco de dados
    await CardEstoque.findByIdAndDelete(id)

    return res.status(200).json({ success: true, message: 'Card deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir card:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}

// Listar cards filtrados por categoria (função personalizada)
export const listarCardsPorCategoria = async (req, res) => {
  const { categoria } = req.query

  try {
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não informada!' })
    }

    const cards = await CardEstoque.find({ categoria }).sort({ createdAt: -1 })

    if (cards.length === 0) {
      return res
        .status(404)
        .json({ message: 'Nenhum card encontrado para essa categoria!' })
    }

    res.status(200).json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar os cards' })
  }
}
