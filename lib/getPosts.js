import { query } from "./db"

export async function getPosts() {
  try {
    const result = await query("SELECT * FROM posts ORDER BY created_at DESC")
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}
