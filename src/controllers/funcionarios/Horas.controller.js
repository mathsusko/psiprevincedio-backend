import HoraTrabalhada from '../../models/HoraTrabalhada.js'

export const listarHorasPorFuncionario = async (req, res) => {
  const { id } = req.params
  const horas = await HoraTrabalhada.find({ funcionarioId: id })
  res.json(horas)
}

export const criarHora = async (req, res) => {
  try {
    const { id } = req.params
    const novaHora = await HoraTrabalhada.create({
      ...req.body,
      funcionarioId: id
    })
    res.status(201).json(novaHora)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const atualizarHora = async (req, res) => {
  try {
    const { horaId } = req.params
    const horaAtualizada = await HoraTrabalhada.findByIdAndUpdate(horaId, req.body, {
      new: true
    })
    res.json(horaAtualizada)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const deletarHora = async (req, res) => {
  try {
    await HoraTrabalhada.findByIdAndDelete(req.params.horaId)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}
