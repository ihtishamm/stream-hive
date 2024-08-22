import { GQLContext, SignInInput, SignUpInput } from "@/types";
import { signin, signup } from "@/lib/auth";
import { GraphQLError } from "graphql";
import prisma from "@/lib/db";

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
    },
    getAllAnnouncements: async () => {
      return await prisma.announcement.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getUserAnnouncements: async (_:any, args:{userid:string}) => {
      return await prisma.announcement.findMany({
        where: {
         userId:args.userid,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
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
    createAnnouncement: async (_:any, args:{input:{message:string}}, ctx:GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      
        return await prisma.announcement.create({
          data: {
            message: args.input.message,
            userId: ctx.user.id,
          },
          include: {
            user: true,
          },
        });

  },
  editAnnouncement: async (_:any, args:{input:{id:string, message:string}}, ctx:GQLContext) => {
    if (!ctx.user) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    }

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: args.input.id,
      },
      include: {
        user: true,
      },
    });

    if (!announcement || announcement.userId !== ctx.user.id) {
      throw new GraphQLError("you can only update your announcements", {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    }

    return await prisma.announcement.update({
      where: {
        id: args.input.id,
      },
      data: {
        message: args.input.message,
      },
      include: {
        user: true,
      },
    });
  },
  deleteAnnouncement: async (_:any, args:{id:string}, ctx:GQLContext) => {
    if (!ctx.user) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: '401' },
      });
    }

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
  

    if (!announcement || announcement.userId !== ctx.user.id) {
      throw new GraphQLError("you can only delete your announcements", {
        extensions: { code: '401' },
      });
    }

    await prisma.announcement.delete({
      where: {
        id: args.id,
      },
    });

    return args.id;
  },
  followUser: async (_: any, args: { input: { followingId: string } }, ctx: GQLContext) => {
    if (!ctx.user) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: '401' },
      });
    }

    if (ctx.user.id === args.input.followingId) {
      throw new GraphQLError("You can't follow yourself", {
        extensions: { code: '401' },
      });
    }

    const existingFollowEngagement = await prisma.followEngagement.findFirst({
      where: {
        followerId: ctx.user.id,
        followingId: args.input.followingId,
      },
    });

    if (existingFollowEngagement) {
      throw new GraphQLError("You are already following this user", {
        extensions: { code: '401' },
      });
    }

    const newFollowEngagement = await prisma.followEngagement.create({
      data: {
        followerId: ctx.user.id,
        followingId: args.input.followingId,
        engagementType: 'FOLLOW',
      },
      include: {
        follower: true, 
        following: true, 
      },
    });

    return newFollowEngagement;
  },

  
   unfollowUser: async (_:any, args:{input:{followingId:string}}, ctx:GQLContext) => {
        
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }
  
      if (ctx.user.id === args.input.followingId) {
        throw new GraphQLError("you can't unfollow yourself", {
          extensions: { code: '401' },
        });
      }
  
      const followEngagement = await prisma.followEngagement.findFirst({
        where: {
          followerId: ctx.user.id,
          followingId: args.input.followingId,
        },
      });
  
      if (!followEngagement) {
        throw new GraphQLError("you are not following this user", {
          extensions: { code: '401' },
        });
      }
  
     await prisma.followEngagement.delete({
      where: {
        followerId_followingId: { followerId:ctx.user.id, followingId:args.input.followingId },
      },
    });
    return args.input.followingId;
    }
}
};

export default resolvers;
