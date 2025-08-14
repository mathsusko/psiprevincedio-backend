import Funcionario from '../../models/Funcionario.js'

export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find()
    res.status(200).json(funcionarios)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar funcionários', mensagem: error.message })
  }
}

export const obterFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id)
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' })
    }
    res.json(funcionario)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao obter funcionário', mensagem: error.message })
  }
}

export const criarFuncionario = async (req, res) => {
  try {
    const funcionario = new Funcionario(req.body)
    await funcionario.save()
    res.status(201).json(funcionario)
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar funcionário', mensagem: error.message })
  }
}

export const atualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' })
    }
    res.json(funcionario)
  } catch (error) {
    res
      .status(400)
      .json({ erro: 'Erro ao atualizar funcionário', mensagem: error.message })
  }
}

export const deletarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndDelete(req.params.id)
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar funcionário', mensagem: error.message })
  }
}
