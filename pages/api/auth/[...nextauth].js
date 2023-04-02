import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import checkUserExists from "../../../lib/checkUserExists"
import createUser from "../../../lib/createUser"

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, name, image } = user
      const { provider } = account
      const { username } = profile

      // Check if user is already registered
      checkUserExists(email).then((userExists) => {
        // If not yet registered, create a new user in postgres
        if (!userExists) {
          createUser({
            email,
            username,
            name,
            image,
            provider,
          })
        }
      })

      return true
    },
  },
}

export default NextAuth(authOptions)
