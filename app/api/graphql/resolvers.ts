import { GQLContext } from "@/types";
import { signin, getUserFromToken, signup } from "@/lib/auth";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    me: async (_:any, __:any, ctx:GQLContext) => {
      return ctx.user
    }
  },
  Mutation: {
    createUser: async (_:any, args) => {
      const data = await signup(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('could not create user', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
    signin: async (_:any, args) => {
      const data = await signin(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
     
  },
};

export default resolvers;
