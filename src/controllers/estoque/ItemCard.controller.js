import ItemCard from '../../models/ItemCard.js'
import CardEstoque from '../../models/CardEstoque.js'

// Listar itens de um card
export const listarItensDoCard = async (req, res) => {
  const { id } = req.params
  try {
    const card = await CardEstoque.findById(id)
    if (!card) return res.status(404).json({ error: 'Card não encontrado' })

    const itens = await ItemCard.find({ cardId: id }).lean()
    const cardNome = card?.nome || ''

    const resposta = itens.map((item) => ({
      ...item,
      cardNome
    }))

    return res.status(200).json(resposta)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar itens: ' + error.message })
  }
}

// Criar item no card
export const criarItemNoCard = async (req, res) => {
  const {
    codigo,
    materialName,
    medida,
    ncm,
    codigoFabrica,
    quantidade,
    precoUnitario,
    precoCusto // <- NOVO
  } = req.body
  const { id } = req.params

  // Validação de quantidade e preço
  if (isNaN(quantidade) || quantidade <= 0) {
    return res.status(400).json({ success: false, error: 'Quantidade inválida' })
  }
  if (isNaN(precoUnitario) || precoUnitario <= 0) {
    return res.status(400).json({ success: false, error: 'Preço unitário inválido' })
  }
  if (isNaN(precoCusto) || precoCusto < 0) {
    return res.status(400).json({ success: false, error: 'Preço de custo inválido' })
  }

  const custoTotal = Number(precoUnitario) * Number(quantidade)

  try {
    const novoItem = await ItemCard.create({
      cardId: id,
      codigo,
      materialName,
      medida,
      ncm,
      codigoFabrica,
      quantidade,
      precoUnitario,
      precoCusto, // <- NOVO
      custoTotal
    })

    return res.status(201).json(novoItem)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar item: ' + error.message })
  }
}

// Atualizar quantidade de um item
export const atualizarQuantidadeItem = async (req, res) => {
  const { cardId, itemId } = req.params
  const { quantidade } = req.body

  // Validação de quantidade
  if (isNaN(quantidade) || quantidade < 0) {
    return res.status(400).json({ success: false, error: 'Quantidade inválida' })
  }

  try {
    const card = await CardEstoque.findById(cardId)
    if (!card)
      return res.status(404).json({ success: false, error: 'Card não encontrado' })

    const item = await ItemCard.findById(itemId)
    if (!item)
      return res.status(404).json({ success: false, error: 'Item não encontrado' })

    item.quantidade = quantidade
    item.custoTotal = item.precoUnitario * item.quantidade // Atualizando custo total
    await item.save()

    return res.status(200).json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar quantidade do item: ' + error.message
    })
  }
}

// Editar item
export const editarItem = async (req, res) => {
  const { cardId, itemId } = req.params
  const {
    codigo,
    materialName,
    medida,
    ncm,
    codigoFabrica,
    quantidade,
    precoUnitario,
    precoCusto // <- NOVO
  } = req.body

  // Validação de campos numéricos
  if (isNaN(precoUnitario) || precoUnitario <= 0) {
    return res.status(400).json({ success: false, error: 'Preço unitário inválido' })
  }
  if (isNaN(precoCusto) || precoCusto < 0) {
    return res.status(400).json({ success: false, error: 'Preço de custo inválido' })
  }

  try {
    const item = await ItemCard.findById(itemId)
    if (!item)
      return res.status(404).json({ success: false, error: 'Item não encontrado' })

    item.codigo = codigo || item.codigo
    item.materialName = materialName || item.materialName
    item.medida = medida || item.medida
    item.ncm = ncm || item.ncm
    item.codigoFabrica = codigoFabrica || item.codigoFabrica
    item.quantidade = quantidade || item.quantidade
    item.precoUnitario = precoUnitario || item.precoUnitario
    item.precoCusto = precoCusto || item.precoCusto // <- NOVO
    item.custoTotal = item.quantidade * item.precoUnitario // Atualiza custo total

    await item.save()

    return res.status(200).json({ success: true, data: item })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Erro ao editar item: ' + error.message })
  }
}

// Deletar item
export const deletarItem = async (req, res) => {
  const { itemId } = req.params

  try {
    const item = await ItemCard.findById(itemId)
    if (!item)
      return res.status(404).json({ success: false, error: 'Item não encontrado' })

    await ItemCard.findByIdAndDelete(itemId)

    return res.status(200).json({ success: true, message: 'Item deletado com sucesso' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Erro ao deletar item: ' + error.message })
  }
}
