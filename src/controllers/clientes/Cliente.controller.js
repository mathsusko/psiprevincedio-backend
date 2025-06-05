import Cliente from '../../models/Cliente.js'

export const listarClientes = async (req, res) => {
  const { clientePaiId } = req.query
  try {
    const query = clientePaiId ? { clientePaiId } : { clientePaiId: null }
    const clientes = await Cliente.find(query).sort({ createdAt: -1 })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const criarCliente = async (req, res) => {
  const {
    nomeEmpresa,
    cnpjCpf,
    endereco,
    numeroEndereco,
    complemento,
    bairro,
    cep,
    cidade,
    estado,
    categoria,
    email,
    telefone,
    ie,
    clientePaiId
  } = req.body

  if (!nomeEmpresa || nomeEmpresa.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Nome da empresa é obrigatório'
    })
  }

  try {
    const cliente = await Cliente.create({
      nomeEmpresa,
      cnpjCpf,
      endereco,
      numeroEndereco,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      categoria,
      email,
      telefone,
      ie,
      clientePaiId: clientePaiId || null
    })

    res.status(201).json({ success: true, data: cliente })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const editarCliente = async (req, res) => {
  const { id } = req.params
  const dados = req.body

  try {
    const cliente = await Cliente.findByIdAndUpdate(id, dados, { new: true })
    res.status(200).json({ success: true, data: cliente })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const deletarCliente = async (req, res) => {
  const { id } = req.params
  try {
    await Cliente.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Cliente deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const obterClientePorId = async (req, res) => {
  const { id } = req.params
  try {
    const cliente = await Cliente.findById(id)
    res.status(200).json(cliente)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const listarFiliaisPorClientePai = async (req, res) => {
  const { clientePaiId } = req.params
  try {
    const filiais = await Cliente.find({ clientePaiId })
    res.status(200).json(filiais)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
