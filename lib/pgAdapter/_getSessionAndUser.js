import { query } from "../db"

const _getSessionAndUser = async (sessionToken) => {
  try {
    // Get session
    const { rows: sessionRows } = await query(
      `
      SELECT * FROM sessions
      WHERE session_token = $1`,
      [sessionToken]
    )

    const session = sessionRows[0]

    if (sessionRows.length === 0) return null

    // Get user
    const { rows: userRows } = await query(
      `
        SELECT * FROM users
        WHERE id = $1`,
      [session.user_id]
    )

    if (userRows.length === 0) return null

    const user = userRows[0]

    return { session, user }
  } catch (err) {
    console.error(err)
  }
}

export default _getSessionAndUser
