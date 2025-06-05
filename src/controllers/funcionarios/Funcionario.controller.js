import Funcionario from '../../models/Funcionario.js'

export const listarFuncionarios = async (req, res) => {
  const funcionarios = await Funcionario.find()
  res.json(funcionarios)
}

export const obterFuncionario = async (req, res) => {
  const funcionario = await Funcionario.findById(req.params.id)
  if (!funcionario) return res.status(404).json({ erro: 'Funcionário não encontrado' })
  res.json(funcionario)
}

export const criarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body)
    res.status(201).json(funcionario)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const atualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.json(funcionario)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const deletarFuncionario = async (req, res) => {
  await Funcionario.findByIdAndDelete(req.params.id)
  res.status(204).send()
}
