import Cliente from '../../models/Cliente.js'

// 🔍 Listar filiais de um cliente pai
// export const listarFiliais = async (req, res) => {
//   const { clientePaiId } = req.params

//   try {
//     const filiais = await Cliente.find({ clientePaiId })
//     res.status(200).json(filiais)
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// }

export const listarFiliais = async (req, res) => {
  const { clientePaiId } = req.params

  try {
    const filiais = await Cliente.find({ clientePaiId })

    res.status(200).json({
      success: true,
      data: filiais
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
// ➕ Criar nova filial
export const criarFilial = async (req, res) => {
  try {
    const novaFilial = await Cliente.create({
      ...req.body,
      clientePaiId: req.body.clientePaiId
    })

    res.status(201).json({ success: true, data: novaFilial })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// ✏️ Atualizar filial
export const editarFilial = async (req, res) => {
  const { id } = req.params

  try {
    const filial = await Cliente.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!filial) {
      return res.status(404).json({
        success: false,
        error: 'Filial não encontrada'
      })
    }

    res.status(200).json({ success: true, data: filial })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// 🗑️ Deletar filial
export const deletarFilial = async (req, res) => {
  const { id } = req.params

  try {
    await Cliente.findByIdAndDelete(id)

    res.status(200).json({ success: true, message: 'Filial deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// 🔎 Obter filial por ID
export const obterFilialPorId = async (req, res) => {
  const { id } = req.params

  try {
    const filial = await Cliente.findById(id)

    if (!filial || !filial.clientePaiId) {
      return res.status(404).json({
        success: false,
        error: 'Filial não encontrada'
      })
    }

    res.status(200).json({ success: true, data: filial })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
