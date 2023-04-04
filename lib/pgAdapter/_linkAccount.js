import { query } from "../db"

const _linkAccount = async (account) => {
  const {
    provider,
    type,
    providerAccountId,
    access_token,
    expires_at,
    refresh_token,
    scope,
    token_type,
    userId,
  } = account
  try {
    const { rows: existingRows } = await query(
      `
      SELECT * FROM accounts
      WHERE user_id = $1 AND provider = $2 AND provider_account_id = $3
      `,
      [userId, provider, providerAccountId]
    )

    if (existingRows.length > 0) {
      // Account already linked to this user, update tokens
      const { id: accountId } = existingRows[0]

      await query(
        `
        UPDATE accounts
        SET refresh_token = $1, access_token = $2, expires_at = $3
        WHERE id = $4`,
        [refresh_token, access_token, expires_at, accountId]
      )

      return
    }

    // Account not yet linked to this user, create new account
    const { rows } = await query(
      `
      INSERT INTO accounts (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        userId,
        type,
        provider,
        providerAccountId,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
      ]
    )

    return rows[0]
  } catch (err) {
    console.error(err)
  }
  return
}

export default _linkAccount
