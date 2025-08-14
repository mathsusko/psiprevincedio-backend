// import Usuario from '../../models/Usuario.js'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

// const gerarToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   })
// }

// export const login = async (req, res) => {
//   const { email, senha } = req.body
//   try {
//     const usuario = await Usuario.findOne({ email })
//     if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' })

//     const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
//     if (!senhaCorreta) return res.status(401).json({ msg: 'Senha incorreta' })

//     const token = gerarToken(usuario._id)
//     res.json({
//       token,
//       usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
//     })
//   } catch (error) {
//     res.status(500).json({ msg: 'Erro no login', error: error.message })
//   }
// }

// export const registrar = async (req, res) => {
//   const { nome, email, senha } = req.body
//   try {
//     const usuarioExistente = await Usuario.findOne({ email })
//     if (usuarioExistente) return res.status(400).json({ msg: 'Email já cadastrado' })

//     const senhaHash = await bcrypt.hash(senha, 10)
//     const novoUsuario = new Usuario({ nome, email, senha: senhaHash })
//     await novoUsuario.save()

//     const token = gerarToken(novoUsuario._id)
//     res.status(201).json({
//       token,
//       usuario: { id: novoUsuario._id, nome: novoUsuario.nome, email: novoUsuario.email }
//     })
//   } catch (error) {
//     res.status(500).json({ msg: 'Erro ao registrar', error: error.message })
//   }
// }

import Usuario from '../../models/Usuario.js'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
  const { email, senha } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' })

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) return res.status(401).json({ msg: 'Senha incorreta' })

    // Login bem-sucedido, não precisamos de token
    res.json({
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
    })
  } catch (error) {
    res.status(500).json({ msg: 'Erro no login', error: error.message })
  }
}

export const registrar = async (req, res) => {
  const { nome, email, senha } = req.body
  try {
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) return res.status(400).json({ msg: 'Email já cadastrado' })

    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash })
    await novoUsuario.save()

    res.status(201).json({
      usuario: { id: novoUsuario._id, nome: novoUsuario.nome, email: novoUsuario.email }
    })
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao registrar', error: error.message })
  }
}
