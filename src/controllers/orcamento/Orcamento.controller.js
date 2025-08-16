import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Orcamento from '../../models/Orcamento.js'
import OrcamentoItem from '../../models/OrcamentoItem.js'

const uploadsDir = path.resolve('src', 'uploads')

export const createOrcamento = async (req, res) => {
  try {
    const { prestadorId, clienteId, custo, dataInicio, dataSaida, descricaoServico } =
      req.body

    if (
      !mongoose.Types.ObjectId.isValid(prestadorId) ||
      !mongoose.Types.ObjectId.isValid(clienteId) // Alterado de filialId para clienteId
    ) {
      return res.status(400).json({ error: 'IDs inválidos' })
    }

    const novo = await Orcamento.create({
      prestadorId,
      clienteId, // Alterado de filialId para clienteId
      custo,
      dataInicio,
      dataSaida,
      descricaoServico
    })

    return res.status(201).json(novo)
  } catch (err) {
    console.error('[❌ ERRO AO CRIAR ORÇAMENTO]', err)
    return res.status(500).json({
      error: 'Erro ao criar orçamento',
      details: err.message
    })
  }
}

export const getOrcamento = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const orcamento = await Orcamento.findById(id)
      .populate('clienteId') // Alterado de filialId para clienteId
      .populate('prestadorId')

    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' })
    }

    const itens = await OrcamentoItem.find({ orcamentoId: id })

    const itensComImagemBase64 = await Promise.all(
      itens.map(async (item) => {
        let imagemBase64 = null

        if (item.imagem) {
          try {
            const cleanFilename = path.basename(item.imagem)
            const filePath = path.join(uploadsDir, cleanFilename)

            if (fs.existsSync(filePath)) {
              const buffer = fs.readFileSync(filePath)
              const ext = path.extname(filePath).toLowerCase()
              const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'
              imagemBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`
            }
          } catch (err) {
            console.warn(`⚠️ Erro ao ler imagem "${item.imagem}":`, err.message)
          }
        }

        return {
          ...item.toObject(),
          imagemBase64
        }
      })
    )

    return res.json({
      ...orcamento.toObject(),
      itens: itensComImagemBase64
    })
  } catch (err) {
    console.error('[❌ ERRO AO BUSCAR ORÇAMENTO]', err)
    return res.status(500).json({
      error: 'Erro ao buscar orçamento',
      details: err.message
    })
  }
}

export const listOrcamentos = async (req, res) => {
  try {
    const filtros = {}

    if (req.query.prestadorId) filtros.prestadorId = req.query.prestadorId
    if (req.query.clienteId) filtros.clienteId = req.query.clienteId // Alterado de filialId para clienteId

    const lista = await Orcamento.find(filtros)
      .sort({ createdAt: -1 })
      .populate('clienteId') // Alterado de filialId para clienteId
      .populate('prestadorId')

    return res.json(lista)
  } catch (err) {
    console.error('[❌ ERRO AO LISTAR ORÇAMENTOS]', err)
    return res.status(500).json({ error: 'Erro ao listar orçamentos' })
  }
}

export const deleteOrcamento = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    // Deleta orçamento
    const orcamentoDeletado = await Orcamento.findByIdAndDelete(id)

    if (!orcamentoDeletado) {
      return res.status(404).json({ error: 'Orçamento não encontrado' })
    }

    // Deleta os itens do orçamento
    await OrcamentoItem.deleteMany({ orcamentoId: id })

    return res.json({ message: 'Orçamento excluído com sucesso' })
  } catch (err) {
    console.error('[❌ ERRO AO EXCLUIR ORÇAMENTO]', err)
    return res.status(500).json({ error: 'Erro ao excluir orçamento' })
  }
}
