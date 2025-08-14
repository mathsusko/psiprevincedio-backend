import jwt from 'jsonwebtoken'

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ msg: 'Token ausente' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(403).json({ msg: 'Token inválido' })
  }
}



export default verificarToken // Alterando para exportação default
