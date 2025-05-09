import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const gerarPDFDoOrcamento = async (req, res) => {
  const { id } = req.params

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const frontendUrl = `http://localhost:5173/preview-orcamento-pdf/${id}`
    await page.goto(frontendUrl, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({ format: 'A4' })

    await browser.close()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="orcamento-${id}.pdf"`
    })

    res.send(pdfBuffer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao gerar PDF' })
  }
}
