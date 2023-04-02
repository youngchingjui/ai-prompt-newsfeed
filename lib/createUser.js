import { query } from "./db"

const createUser = async ({ email, username, name, image, provider }) => {
  await query(
    "INSERT INTO users (email, username, name, profile_picture, oauth_provider) VALUES ($1, $2, $3, $4, $5)",
    [email, username, name, image, provider]
  )
}

export default createUser
