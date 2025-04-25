// src/controllers/estoque/CardEstoque.controller.js
import CardEstoque from '../../models/CardEstoque.js'
import ItemCard from '../../models/ItemCard.js'
import path from 'path'
import fs from 'fs'

// Listar os cards
export const listarCards = async (req, res) => {
  try {
    const cards = await CardEstoque.find().sort({ createdAt: -1 })
    res.status(200).json(cards)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

// Listar itens de um card
export const listarItensDoCard = async (req, res) => {
  try {
    const { id } = req.params
    const itens = await ItemCard.find({ cardId: id }).lean()
    const card = await CardEstoque.findById(id)
    
    if (!card) {
      return res.status(404).json({ error: 'Card não encontrado' })
    }

    const cardNome = card?.nome || ''
    const resposta = itens.map((item) => ({
      ...item,
      cardNome,
    }))

    res.status(200).json(resposta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Criar novo card
export const criarCard = async (req, res) => {
  const { nome } = req.body
  const imagem = req.file

  if (!imagem) {
    return res.status(400).json({ success: false, error: 'A imagem é obrigatória!' })
  }

  try {
    const imagemUrl = `/uploads/${imagem.filename}`
    const novoCard = await CardEstoque.create({ nome, imagemUrl })
    return res.status(201).json({ success: true, data: novoCard })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
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

    const imagemPath = path.join('src', card.imagemUrl)

    if (fs.existsSync(imagemPath)) {
      fs.unlinkSync(imagemPath)
    }

    await CardEstoque.findByIdAndDelete(id)
    return res.status(200).json({ success: true, message: 'Card deletado com sucesso' })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

// Editar card
export const editarCard = async (req, res) => {
  const { id } = req.params
  const { nome } = req.body
  const novaImagem = req.file

  try {
    const card = await CardEstoque.findById(id)

    if (!card) {
      return res.status(404).json({ success: false, error: 'Card não encontrado' })
    }

    if (novaImagem) {
      const imagemAntigaPath = path.resolve('src', card.imagemUrl.replace(/^\/+/, ''))

      if (fs.existsSync(imagemAntigaPath)) {
        fs.unlinkSync(imagemAntigaPath)
      }

      card.imagemUrl = `/uploads/${novaImagem.filename}`
    }

    if (nome) {
      card.nome = nome
    }

    await card.save()
    return res.status(200).json({ success: true, data: card })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

// Criar item no card
export const criarItemNoCard = async (req, res) => {
  const { id } = req.params
  const { codigo, descricao, medida, ncm, codigoFabrica, quantidade, precoUnitario } = req.body

  const custoTotal = Number(precoUnitario) * Number(quantidade)

  try {
    const novoItem = await ItemCard.create({
      cardId: id,
      codigo,
      descricao,
      medida,
      ncm,
      codigoFabrica,
      quantidade,
      precoUnitario,
      custoTotal,
    })

    res.status(201).json(novoItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Atualizar a quantidade de um item
export const atualizarQuantidadeItem = async (req, res) => {
  const { cardId, itemId } = req.params
  const { quantidade } = req.body

  if (isNaN(quantidade) || quantidade < 0) {
    return res.status(400).json({ success: false, error: 'Quantidade inválida' })
  }

  try {
    const card = await CardEstoque.findById(cardId)
    if (!card) {
      return res.status(404).json({ success: false, error: 'Card não encontrado' })
    }

    const item = await ItemCard.findById(itemId)
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item não encontrado' })
    }

    item.quantidade = quantidade
    await item.save()

    return res.status(200).json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

// src/controllers/estoque/CardEstoque.controller.js
export const editarItem = async (req, res) => {
  const { cardId, itemId } = req.params;
  const { codigo, descricao, medida, ncm, codigoFabrica, quantidade, precoUnitario } = req.body;

  try {
    // Verificar se o item existe
    const item = await ItemCard.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item não encontrado' });
    }

    // Atualizar os campos alterados
    item.codigo = codigo || item.codigo;
    item.descricao = descricao || item.descricao;
    item.medida = medida || item.medida;
    item.ncm = ncm || item.ncm;
    item.codigoFabrica = codigoFabrica || item.codigoFabrica;
    item.quantidade = quantidade || item.quantidade;
    item.precoUnitario = precoUnitario || item.precoUnitario;
    item.custoTotal = item.quantidade * item.precoUnitario; // Atualiza o custo total com base na nova quantidade e preço unitário

    await item.save();

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deletarItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await ItemCard.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item não encontrado' });
    }

    await ItemCard.findByIdAndDelete(itemId);

    return res.status(200).json({ success: true, message: 'Item deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

