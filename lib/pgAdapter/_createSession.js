import { query } from "../db"
const _createSession = async ({ sessionToken, userId, expires }) => {
  try {
    const { rows: sessions } = await query(
      "INSERT INTO sessions (session_token, user_id, expires) VALUES ($1, $2, $3) RETURNING *",
      [sessionToken, userId, expires]
    )
    const session = sessions[0]
    return { sessionToken: session.session_token, ...session }
  } catch (err) {
    console.error(err)
  }
}

export default _createSession
