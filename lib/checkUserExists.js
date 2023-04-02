import { query } from "./db"

const checkUserExists = async (email) => {
  const result = await query("SELECT * FROM users WHERE email = $1", [email])
  return result.rows.length > 0
}

export default checkUserExists
