import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { PostgresAdapter } from "../../../lib/pgAdapter/index"

export const authOptions = {
  adapter: PostgresAdapter(),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)
