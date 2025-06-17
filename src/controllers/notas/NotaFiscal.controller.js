import NotaFiscal from '../../models/NotaFiscal.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const criarNotaFiscal = async (req, res) => {
  try {
    const { clienteNome, descricao, dataRecebimento, filialId } = req.body
    const arquivo = req.file

    if (!arquivo || !clienteNome || !filialId) {
      return res
        .status(400)
        .json({ message: 'Arquivo, nome da empresa e ID da filial são obrigatórios.' })
    }

    const dataRecebida = new Date(dataRecebimento)
    dataRecebida.setUTCHours(12) // Corrige o offset de timezone

    const novaNota = await NotaFiscal.create({
      clienteNome: clienteNome,
      descricao,
      dataRecebimento: dataRecebida,
      caminhoArquivo: arquivo.filename,
      filialId: filialId // Aqui associamos a nota à filial
    })

    res.status(201).json(novaNota)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao criar nota fiscal.' })
  }
}

export const listarNotasFiscais = async (req, res) => {
  try {
    const notas = await NotaFiscal.find().sort({ createdAt: -1 })
    res.json(notas)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar notas fiscais.' })
  }
}

export const deletarNotaFiscal = async (req, res) => {
  try {
    const { id } = req.params
    const nota = await NotaFiscal.findByIdAndDelete(id)

    if (!nota) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada.' })
    }

    res.json({ message: 'Nota fiscal removida com sucesso.' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover nota fiscal.' })
  }
}
