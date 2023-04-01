import { pool } from "./db"

export const insertPost = async (prompt, image_url) => {
  const client = await pool.connect()
  try {
    const query = {
      text: "INSERT INTO posts (prompt, image_url) VALUES ($1, $2) RETURNING *",
      values: [prompt, image_url],
    }

    const result = await client.query(query)
    return result.rows[0]
  } finally {
    client.release()
  }
}
