import { query } from "../../../lib/db"
import nextConnectBase from "../../../lib/nextConnectBase"

const handler = nextConnectBase()

handler.get(async (req, res) => {
  const { user_id } = req.query
  console.log(req)

  try {
    const { rows } = await query(
      `
    SELECT * FROM likes 
    WHERE user_id = $1`,
      [user_id]
    )
    return res.json({ rows })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

handler.post(async (req, res) => {
  const { user_id, post_id, is_liked } = req.body
  const postIdInt = parseInt(post_id)

  try {
    if (is_liked) {
      await query("INSERT INTO likes (post_id, user_id) VALUES ($1, $2)", [
        postIdInt,
        user_id,
      ])
    } else {
      await query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [
        postIdInt,
        user_id,
      ])
    }

    res.status(200).send("Updated like successfully")
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Failed to update like status" })
  }
})

export default handler
