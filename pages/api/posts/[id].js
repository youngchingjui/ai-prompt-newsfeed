import nextConnect from "next-connect"

import { query } from "../../../lib/db"

const handler = nextConnect({
  onError(error, req, res) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

handler.put(async (req, res) => {
  const { id } = req.query
  const { likeCount } = req.body
  try {
    const result = await query(
      "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
      [likeCount, id]
    )
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to update like count" })
  }
})

export default handler
