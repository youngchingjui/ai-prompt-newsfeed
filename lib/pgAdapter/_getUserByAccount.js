import { query } from "../db"

const _getUserByAccount = async ({ providerAccountId, provider }) => {
  try {
    // Get account
    const { rows: accountRows } = await query(
      `
      SELECT * FROM accounts
      WHERE provider = $1 AND provider_account_id = $2
      `,
      [provider, providerAccountId]
    )

    if (accountRows.length === 0) return null

    const account = accountRows[0]

    // Get user
    const { rows: userRows } = await query(
      `
      SELECT * FROM users
      WHERE id = $1`,
      [account.user_id]
    )

    if (userRows.length === 0) return null

    return userRows[0]
  } catch (err) {
    console.error(err)
  }
}

export default _getUserByAccount
