import { query } from "./db"

const getPosts = async () => {
  try {
    const result = await query(`
    SELECT p.*, CAST(COUNT(l.user_id) AS INTEGER) AS likes
    FROM posts p
    LEFT JOIN likes l ON p.id = l.post_id
    GROUP BY p.id
    ORDER BY p.created_at DESC;
    `)
    return result.rows
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getPosts
