import { query } from "./db"

export async function getPosts() {
  try {
    const result = await query("SELECT * FROM posts")
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}
