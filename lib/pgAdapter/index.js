"use strict"

const { default: _createSession } = require("./_createSession")
const { default: _createUser } = require("./_createUser")
const { default: _deleteSession } = require("./_deleteSession")
const { default: _getSessionAndUser } = require("./_getSessionandUser")
const { default: _getUserByAccount } = require("./_getUserByAccount")
const { default: _getUserByEmail } = require("./_getUserByEmail")
const { default: _linkAccount } = require("./_linkAccount")

Object.defineProperty(exports, "__esModule", { value: true })
exports.PostgresAdapter = void 0
function PostgresAdapter() {
  return {
    createUser: _createUser,
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: _getUserByEmail,
    getUserByAccount: _getUserByAccount,
    updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: _linkAccount,
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }),
    getSessionAndUser: _getSessionAndUser,
    createSession: _createSession,
    updateSession: (data) =>
      p.session.update({ where: { sessionToken: data.sessionToken }, data }),
    deleteSession: _deleteSession,
    // deleteSession: (sessionToken) =>
    //   p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data })
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id
      return verificationToken
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        })
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id
        return verificationToken
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if (error.code === "P2025") return null
        throw error
      }
    },
  }
}
exports.PostgresAdapter = PostgresAdapter
