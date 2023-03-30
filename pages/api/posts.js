import db from "../../lib/db"

export default async function handler(req, res) {
  try {
    const result = await db.query("SELECT * FROM posts")
    const posts = result.rows
    res.status(200).json({ posts })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
