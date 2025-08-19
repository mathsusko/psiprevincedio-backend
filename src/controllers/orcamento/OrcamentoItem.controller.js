import mongoose from 'mongoose'
import OrcamentoItem from '../../models/OrcamentoItem.js'

export const createItem = async (req, res) => {
  try {
    const {
      orcamentoId,
      materialId,
      nome,
      medida,
      quantidade,
      precoUn,
      imagem // ✅ Agora captura a imagem do body
    } = req.body

    // Validação de orcamentoId
    if (!mongoose.Types.ObjectId.isValid(orcamentoId)) {
      return res.status(400).json({ error: 'orcamentoId inválido' })
    }
    // Criação do item de orçamento
    const item = await OrcamentoItem.create({
      orcamentoId,
      materialId,
      nome,
      medida,
      quantidade,
      precoUn,
      imagem // ✅ Agora salva no banco
    })
    return res.status(201).json(item)
  } catch (err) {
    console.error('Erro ao criar item de orçamento:', err)
    return res.status(500).json({
      error: 'Não foi possível salvar o item',
      details: err.message
    })
  }
}
