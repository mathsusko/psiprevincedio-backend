  // src/controllers/estoque/CardEstoque.controller.js
  import CardEstoque from '../../models/CardEstoque.js'
  import ItemCard from '../../models/ItemCard.js'
  import upload from '../../middleware/upload.js'

  export const listarCards = async (req, res) => {
    try {
      const cards = await CardEstoque.find().sort({ createdAt: -1 })
      res.status(200).json(cards) // Retorna todos os cards
    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  }
  
  export const listarItensDoCard = async (req, res) => {
    try {
      const { id } = req.params
  
      // Buscar os itens do card com base no id
      const itens = await ItemCard.find({ cardId: id }).lean()
      const card = await CardEstoque.findById(id)
      
      if (!card) {
        return res.status(404).json({ error: 'Card não encontrado' })
      }
  
      // Adiciona o nome do card aos itens
      const cardNome = card?.nome || ''
      const resposta = itens.map((item) => ({
        ...item,
        cardNome,
      }))
  
      res.status(200).json(resposta) // Retorna os itens com o nome do card
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  export const criarCard = async (req, res) => {
    const { nome } = req.body
    const imagem = req.file

    // Verificando se a imagem foi enviada
    if (!imagem) {
      return res.status(400).json({ 
        success: false,
        error: 'A imagem é obrigatória!'
      })
    }

    try {
      const imagemUrl = `/uploads/${imagem.filename}`

      // Criando o card
      const novoCard = await CardEstoque.create({ nome, imagemUrl })

      return res.status(201).json({
        success: true,
        data: novoCard
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }
  }
  export const deletarCard = async (req, res) => {
    const { id } = req.params

    try {
      const card = await CardEstoque.findById(id)

      if (!card) {
        return res.status(404).json({ success: false, error: 'Card não encontrado' })
      }

      // Caminho da imagem no disco
      const imagemPath = path.join('src', card.imagemUrl)

      // Removendo o arquivo de imagem, se existir
      if (fs.existsSync(imagemPath)) {
        fs.unlinkSync(imagemPath)
      }

      // Removendo o documento do MongoDB
      await CardEstoque.findByIdAndDelete(id)

      return res.status(200).json({ success: true, message: 'Card deletado com sucesso' })
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  export const editarCard = async (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    const novaImagem = req.file

    try {
      const card = await CardEstoque.findById(id)

      if (!card) {
        return res.status(404).json({ success: false, error: 'Card não encontrado' })
      }

      // Se for enviada uma nova imagem, remover a antiga e salvar a nova
      if (novaImagem) {
        const imagemAntigaPath = path.join('src', card.imagemUrl)
        if (fs.existsSync(imagemAntigaPath)) {
          fs.unlinkSync(imagemAntigaPath)
        }

        card.imagemUrl = `/uploads/${novaImagem.filename}`
      }

      // Atualiza nome se foi enviado
      if (nome) {
        card.nome = nome
      }

      await card.save()

      return res.status(200).json({ success: true, data: card })
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  

  export const criarItemNoCard = async (req, res) => {
    try {
      const { id } = req.params
      const {
        codigo,
        descricao,  
        medida,
        ncm,
        codigoFabrica,
        quantidade,
        precoUnitario
      } = req.body

      const custoTotal = Number(precoUnitario) * Number(quantidade)

      const novoItem = await ItemCard.create({
        cardId: id,
        codigo,
        descricao,
        medida,
        ncm,
        codigoFabrica,
        quantidade,
        precoUnitario,
        custoTotal
      })

      res.status(201).json(novoItem)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
