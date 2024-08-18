import prisma from "@/lib/db";

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    user: async (_parent: any, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    },
    posts: async () => {
      return prisma.post.findMany();
    },
    post: async (_parent: any, args: { id: string }) => {
      return prisma.post.findUnique({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: { email: string; name?: string; password: string }) => {
      return await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          password: args.password,
        },
      });
    },
    createPost: async (_parent: any, args: { title: string; content: string; authorId: string }) => {
      return await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
        },
      });
    },
  },
  User: {
    posts: async (parent: { id: string }) => {
      return await prisma.post.findMany({
        where: { authorId: parent.id },
      });
    },
  },
  Post: {
    author: async (parent: { authorId: string }) => {
      return await prisma.user.findUnique({
        where: { id: parent.authorId },
      });
    },
  },
};

export default resolvers;
