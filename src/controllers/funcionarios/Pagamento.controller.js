import Pagamento from '../../models/PagamentoFuncionario.js'

export const listarPagamentos = async (req, res) => {
  const { id } = req.params
  const pagamentos = await Pagamento.find({ funcionarioId: id })
  res.json(pagamentos)
}

export const criarPagamento = async (req, res) => {
  const { id } = req.params
  const pagamento = await Pagamento.create({
    ...req.body,
    funcionarioId: id
  })
  res.status(201).json(pagamento)
}

export const atualizarPagamento = async (req, res) => {
  const { pagamentoId } = req.params
  const pagamento = await Pagamento.findByIdAndUpdate(pagamentoId, req.body, {
    new: true
  })
  res.json(pagamento)
}

export const deletarPagamento = async (req, res) => {
  await Pagamento.findByIdAndDelete(req.params.pagamentoId)
  res.status(204).send()
}
