import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Permite usar require() se necessário
export const safeImport = (path) => require(path)
