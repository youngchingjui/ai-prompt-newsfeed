import { query } from "../db"

const _deleteSession = async (sessionToken) => {
  try {
    const { rows } = await query(
      `
      DELETE FROM sessions
      WHERE session_token = $1
      RETURNING *
      `,
      [sessionToken]
    )

    if (rows.length === 0) {
      throw new Error("Session not found")
    }

    return rows[0]
  } catch (err) {
    console.error(err)
  }
}

export default _deleteSession
