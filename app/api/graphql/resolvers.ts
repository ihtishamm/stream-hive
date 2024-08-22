import { GQLContext, SignInInput, SignUpInput } from "@/types";
import { signin, signup } from "@/lib/auth";
import { GraphQLError } from "graphql";

type SignInArgs = {
  input: SignInInput;
};

type SignUpArgs = {
  input: SignUpInput;
};

const resolvers = {
  Query: {
    me: async (_:any, __:any, ctx:GQLContext) => {
      return ctx.user
    }
  },
  Mutation: {
    createUser: async (_:any, args:SignUpArgs) => {
      const data = await signup(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('could not create user', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
    signIn: async (_:any, args:SignInArgs) => {
      const data = await signin(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
     
  },
};

export default resolvers;
