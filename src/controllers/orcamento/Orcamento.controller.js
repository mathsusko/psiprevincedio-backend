import Orcamento from '../../models/Orcamento.js'
import OrcamentoItem from '../../models/OrcamentoItem.js'
import mongoose from 'mongoose'

export const createOrcamento = async (req, res) => {
  try {
    const { prestadorId, clienteId, custo, dataInicio, dataSaida } = req.body

    if (
      !mongoose.Types.ObjectId.isValid(prestadorId) ||
      !mongoose.Types.ObjectId.isValid(clienteId)
    ) {
      return res.status(400).json({ error: 'IDs inválidos' })
    }

    const novo = await Orcamento.create({
      prestadorId,
      clienteId,
      custo,
      dataInicio,
      dataSaida
    })
    return res.status(201).json(novo)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Erro ao criar orçamento', details: err.message })
  }
}

export const getOrcamento = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const orcamento = await Orcamento.findById(id)
      .populate('clienteId')
      .populate('prestadorId')

    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' })
    }

    const itens = await OrcamentoItem.find({ orcamentoId: id })

    return res.json({ ...orcamento.toObject(), itens })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar orçamento' })
  }
}

// export const getOrcamento = async (req, res) => {
//   try {
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'ID inválido' })
//     }

//     const occ = await Orcamento.findById(id).populate('clienteId').populate('prestadorId')

//     if (!occ) return res.status(404).json({ error: 'Orçamento não encontrado' })
//     return res.json(occ)
//   } catch (err) {
//     console.error(err)
//     return res.status(500).json({ error: 'Erro ao buscar orçamento' })
//   }
// }

// NOVO: lista todos (ou por filtro)
export const listOrcamentos = async (req, res) => {
  try {
    const filtros = {}
    if (req.query.prestadorId) filtros.prestadorId = req.query.prestadorId
    if (req.query.clienteId) filtros.clienteId = req.query.clienteId

    const lista = await Orcamento.find(filtros).sort({ createdAt: -1 })
    return res.json(lista)
  } catch (err) {
    console.error('Erro ao listar orçamentos:', err)
    return res.status(500).json({ error: 'Erro ao listar orçamentos' })
  }
}
