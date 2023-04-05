import { query } from "./db"

const getPost = async (postId) => {
  try {
    const result = await query(
      `
    SELECT * FROM posts WHERE id = $1`,
      [postId]
    )
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getPost
