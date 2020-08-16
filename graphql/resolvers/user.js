import { compare } from "bcryptjs"
import { UserInputError } from "apollo-server-express"
import User from "../../models/user.js"
import { signUp, signIn, objectId } from "../../validators/index.js"
import { createToken, accessTokenAge, refreshTokenAge } from "../../utils/auth.js"

const parseUser = ({ _doc }) => ({
  ..._doc,
  _id: undefined,
  id: _doc._id,
})

const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      return User.findById(req.userId)
    },

    user: async (_, { id }) => {
      const { error } = await objectId.validate(id)

      if (error) {
        throw new UserInputError(`${id} is not a valid user id.`)
      }
      return User.findById(id)
    },

    users: async () => {
      const allUsers = await User.find()
      return allUsers.map(parseUser)
    },
  },

  Mutation: {
    signIn: async (_, { input }, { res }) => {
      const { email, password } = input
      const { error } = signIn.validate({ email, password }, { abortEarly: false })
      if (error) {
        throw new UserInputError(error)
      }

      const user = await User.findOne({
        email,
      })

      if (!user) {
        throw new UserInputError("User doesn't exist")
      }
      const valid = await compare(password, user.password)
      if (!valid) {
        throw new UserInputError("Password is incorrect")
      }

      const { accessToken, refreshToken } = createToken(user)
      res.cookie("access-token", accessToken, { maxAge: accessTokenAge })
      res.cookie("refresh-token", refreshToken, { maxAge: refreshTokenAge })

      return {
        id: user.id,
        email,
        accessToken,
        refreshToken,
        expiresIn: 1,
      }
    },

    signUp: async (_, { input }) => {
      const { email, password } = input
      const { error } = signUp.validate({ email, password }, { abortEarly: false })

      if (error) {
        throw new UserInputError(error)
      }
      const newUser = await User.create({
        email,
        password,
      })

      return parseUser(newUser)
    },

    signOut: async (_, __, { req, res }) => {
      const user = await User.findById(req.userId)
      if (!user) {
        return false
      }
      user.lastSeen = Date.now()
      await user.save()
      res.clearCookie("access-token")
      res.clearCookie("refresh-token")
      return true
    },

    invalidateToken: async (_, __, { req, res }) => {
      const user = await User.findById(req.userId)
      if (!user) {
        return false
      }
      user.lastSeen = Date.now()
      await user.save()
      res.clearCookie("access-token")
      return true
    },
  },
}

export default resolvers
