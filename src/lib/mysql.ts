import { createConnection } from 'mysql2/promise'

export async function connection() {
  try {
    const conn = await createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })

    return conn
  } catch (error: any) {
    throw new Error('Falha ao tentar conectar com o banco de dados')
  }
}



