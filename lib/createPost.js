import { query } from "./db"

const createPost = async (prompt, image_url) => {
  try {
    const { rows } = await query(
      `
      INSERT INTO posts (prompt, image_url) 
      VALUES ($1, $2) 
      RETURNING *`,
      [prompt, image_url]
    )

    return rows[0]
  } catch (err) {
    console.error(err)
  }
}

export default createPost
