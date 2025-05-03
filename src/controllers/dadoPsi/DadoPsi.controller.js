import DadoPsi from '../../models/DadoPsi.js'

// Listar todos os dados da empresa (dona do sistema)
export const listarDadoPsi = async (req, res) => {
  try {
    const dadosPsi = await DadoPsi.find().sort({ createdAt: -1 })
    res.status(200).json(dadosPsi)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

// Criar novo dadoPsi
export const criarDadoPsi = async (req, res) => {
  const {
    nomeEmpresa,
    cnpj,
    endereco,
    numeroEndereco,
    complemento,
    bairro,
    cep,
    cidade,
    estado,
    email,
    telefone,
    categoria
  } = req.body

  try {
    // Verificar se o CNPJ já existe no banco de dados
    const cnpjExistente = await DadoPsi.findOne({ cnpj })
    if (cnpjExistente) {
      return res.status(400).json({ success: false, error: 'CNPJ já cadastrado!' })
    }

    const novoDadoPsi = await DadoPsi.create({
      nomeEmpresa,
      cnpj,
      endereco,
      numeroEndereco,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      email,
      telefone,
      categoria
    })
    res.status(201).json({ success: true, data: novoDadoPsi })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// Editar dadoPsi
export const editarDadoPsi = async (req, res) => {
  const { id } = req.params
  const {
    nomeEmpresa,
    cnpj,
    endereco,
    numeroEndereco,
    complemento,
    bairro,
    cep,
    cidade,
    estado,
    email,
    telefone,
    categoria
  } = req.body

  try {
    const dadoPsi = await DadoPsi.findById(id)
    if (!dadoPsi) {
      return res.status(404).json({ success: false, error: 'DadoPsi não encontrado' })
    }

    // Verificar se o CNPJ já existe no banco de dados, excluindo o dadoPsi atual
    const cnpjExistente = await DadoPsi.findOne({ cnpj })
    if (cnpjExistente && cnpjExistente._id.toString() !== dadoPsi._id.toString()) {
      return res.status(400).json({ success: false, error: 'CNPJ já cadastrado!' })
    }

    dadoPsi.nomeEmpresa = nomeEmpresa || dadoPsi.nomeEmpresa
    dadoPsi.cnpj = cnpj || dadoPsi.cnpj
    dadoPsi.endereco = endereco || dadoPsi.endereco
    dadoPsi.numeroEndereco = numeroEndereco || dadoPsi.numeroEndereco
    dadoPsi.complemento = complemento || dadoPsi.complemento
    dadoPsi.bairro = bairro || dadoPsi.bairro
    dadoPsi.cep = cep || dadoPsi.cep
    dadoPsi.cidade = cidade || dadoPsi.cidade
    dadoPsi.estado = estado || dadoPsi.estado
    dadoPsi.email = email || dadoPsi.email
    dadoPsi.telefone = telefone || dadoPsi.telefone
    dadoPsi.categoria = categoria || dadoPsi.categoria

    await dadoPsi.save()
    res.status(200).json({ success: true, data: dadoPsi })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Deletar dadoPsi
export const deletarDadoPsi = async (req, res) => {
  const { id } = req.params

  try {
    const dadoPsi = await DadoPsi.findById(id)
    if (!dadoPsi) {
      return res.status(404).json({ success: false, error: 'DadoPsi não encontrado' })
    }

    await DadoPsi.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'DadoPsi deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Obter dadoPsi pelo ID
export const obterDadoPsiPorId = async (req, res) => {
  const { id } = req.params

  try {
    const dadoPsi = await DadoPsi.findById(id)
    if (!dadoPsi) {
      return res.status(404).json({ success: false, error: 'DadoPsi não encontrado' })
    }
    res.status(200).json(dadoPsi)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
