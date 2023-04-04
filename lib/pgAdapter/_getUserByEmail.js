import { query } from "../db"

const _getUserByEmail = async (email) => {
  try {
    const { rows } = await query(
      `
      SELECT * FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [email]
    )

    return rows[0]
  } catch (err) {
    console.error(err)
  }
}

export default _getUserByEmail
