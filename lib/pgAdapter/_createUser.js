import { query } from "../db"
const _createUser = async (user) => {
  const { name, email, image, emailVerified } = user
  try {
    const { rows } = await query(
      "INSERT INTO users (email, name, image, emailVerified) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, name, image, emailVerified]
    )

    return rows[0]
  } catch (err) {
    console.error(err)
  }
}

export default _createUser
