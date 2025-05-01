import Cliente from '../../models/Cliente.js'

// Listar todos os clientes
export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

// Criar novo cliente
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
    categoria
  } = req.body

  try {
    const novoCliente = await Cliente.create({
      nomeEmpresa,
      cnpjCpf,
      endereco,
      numeroEndereco,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      categoria
    })
    res.status(201).json({ success: true, data: novoCliente })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// Editar cliente
export const editarCliente = async (req, res) => {
  const { id } = req.params
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
    categoria
  } = req.body

  try {
    const cliente = await Cliente.findById(id)
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }

    cliente.nomeEmpresa = nomeEmpresa || cliente.nomeEmpresa
    cliente.cnpjCpf = cnpjCpf || cliente.cnpjCpf
    cliente.endereco = endereco || cliente.endereco
    cliente.numeroEndereco = numeroEndereco || cliente.numeroEndereco
    cliente.complemento = complemento || cliente.complemento
    cliente.bairro = bairro || cliente.bairro
    cliente.cep = cep || cliente.cep
    cliente.cidade = cidade || cliente.cidade
    cliente.estado = estado || cliente.estado
    cliente.categoria = categoria || cliente.categoria

    await cliente.save()
    res.status(200).json({ success: true, data: cliente })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Deletar cliente
export const deletarCliente = async (req, res) => {
  const { id } = req.params

  try {
    const cliente = await Cliente.findById(id)
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }

    await Cliente.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Cliente deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Obter um cliente pelo ID
export const obterClientePorId = async (req, res) => {
  const { id } = req.params

  try {
    const cliente = await Cliente.findById(id)
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
