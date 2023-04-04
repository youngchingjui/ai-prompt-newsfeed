import { query } from "./db"

const createPost = async ({ prompt, image_url, user_id }) => {
  try {
    const { rows } = await query(
      `
      INSERT INTO posts (prompt, image_url, user_id) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [prompt, image_url, user_id]
    )

    return rows[0]
  } catch (err) {
    console.error(err)
  }
}

export default createPost
