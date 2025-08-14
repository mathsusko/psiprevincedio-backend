// src/controllers/clientes/Cliente.controller.js
import ClientePrincipal from '../../models/Cliente.js'

// Listar todos os clientes
export const listarClientes = async (req, res) => {
  try {
    const clientes = await ClientePrincipal.find().sort({ createdAt: -1 })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Criar um novo cliente
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
    email,
    telefone,
    categoria,
    ie
  } = req.body

  // Validações
  if (!nomeEmpresa || nomeEmpresa.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Nome da empresa é obrigatório'
    })
  }

  try {
    // Criando o cliente com os dados fornecidos
    const cliente = await ClientePrincipal.create({
      nomeEmpresa,
      cnpjCpf,
      endereco,
      numeroEndereco,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      email,
      telefone,
      categoria,
      ie
    })

    res.status(201).json({ success: true, data: cliente })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// Obter cliente por ID
export const obterClientePorId = async (req, res) => {
  const { id } = req.params

  try {
    const cliente = await ClientePrincipal.findById(id)
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Editar cliente
export const editarCliente = async (req, res) => {
  const { id } = req.params
  const dados = req.body

  try {
    const cliente = await ClientePrincipal.findByIdAndUpdate(id, dados, { new: true })
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }
    res.status(200).json({ success: true, data: cliente })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}


// Deletar cliente
export const deletarCliente = async (req, res) => {
  const { id } = req.params

  try {
    const cliente = await ClientePrincipal.findByIdAndDelete(id)
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Cliente deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

