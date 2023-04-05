import { query } from "./db"

const getPostPaths = async () => {
  try {
    const result = await query(`SELECT id FROM posts`)
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getPostPaths
