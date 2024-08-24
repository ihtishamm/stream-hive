import { GQLContext, SignInInput, SignUpInput } from "@/types";
import { signin, signup } from "@/lib/auth";
import { GraphQLError, } from "graphql";
import prisma from "@/lib/db";
import { GraphQLUpload } from "graphql-upload-ts";
import { Upload } from "graphql-upload-ts";
import cloudinary from "@/lib/Cloudinary";

type SignInArgs = {
  input: SignInInput;
};

type SignUpArgs = {
  input: SignUpInput;
};

const resolvers = {
  Upload: GraphQLUpload,
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
    },
    getUserFollowers: async (_:any, args:{userId:string}) => {
      const followers = await prisma.followEngagement.findMany({
        where: {
          followingId: args.userId,
          engagementType: 'FOLLOW',
        },
        include: {
          follower: true,
        },
      });
      return followers.map(f => f.follower);
    },
    getUserFollowing: async (_:any, args:{userId:string}) => {
      const following = await prisma.followEngagement.findMany({
        where: {
          followerId: args.userId,
          engagementType: 'FOLLOW',
        },
        include: {
          following: true,
        },
      });
      return following.map(f => f.following);
    },
    getallVideos: async () => {
      return await prisma.video.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getUservideos: async (_:any, args:{userId:string}) => {
      return await prisma.video.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getVideoComments: async (_:any, args:{videoId:string}) => {
      return await prisma.comment.findMany({
        where: {
          videoId: args.videoId,
        },
        include: {
          user: true,
          video: true,
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
    },
    likeAnnouncement: async (_:any, args:{input:{announcementId:string}},ctx:GQLContext) => {
      if(!ctx.user){
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }
      
        const existedEngagement = await prisma.announcementEngagement.findFirst({
          where:{
            userId:ctx.user.id,
            announcementId:args.input.announcementId
          }
          
    });
          console.log(existedEngagement, 'existedEngagement');
          if(existedEngagement){
            if(existedEngagement.engagementType === 'LIKE'){
              await prisma.announcementEngagement.delete({
                where:{
                 userId_announcementId:{userId:ctx.user.id, announcementId:args.input.announcementId}
                }
              });
              return "unliked";
            } 
            else if(existedEngagement.engagementType === 'DISLIKE'){
              await prisma.announcementEngagement.update({
                where:{
                  userId_announcementId:{userId:ctx.user.id, announcementId:args.input.announcementId}
                },
                data:{
                  engagementType:'LIKE'
                }
              });
            }
          }

           return await prisma.announcementEngagement.create({
            data:{
              userId:ctx.user.id,
              announcementId:args.input.announcementId,
              engagementType:'LIKE'
            },
            include:{
              announcement:true
            }
          });

  },
     dislikeAnnouncement: async (_:any, args:{input:{announcementId:string}},ctx:GQLContext) => {
      if(!ctx.user){
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }
        const existedEngagement = await prisma.announcementEngagement.findFirst({
          where:{
            userId:ctx.user.id,
            announcementId:args.input.announcementId
          }
    });
          if(existedEngagement){
            if(existedEngagement.engagementType === 'DISLIKE'){
              await prisma.announcementEngagement.delete({
                where:{
                 userId_announcementId:{userId:ctx.user.id, announcementId:args.input.announcementId}
                }
              });
              return "undisliked";
            } 
            else if(existedEngagement.engagementType === 'LIKE'){
              await prisma.announcementEngagement.update({
                where:{
                  userId_announcementId:{userId:ctx.user.id, announcementId:args.input.announcementId}
                },
                data:{
                  engagementType:'DISLIKE'
                }
              });
            }
          }

           return await prisma.announcementEngagement.create({
            data:{
              userId:ctx.user.id,
              announcementId:args.input.announcementId,
              engagementType:'DISLIKE'
            },
            include:{
              announcement:true
            }
          });
  },
  uploadVideo: async (_: any, { input }: any, ctx: GQLContext) => {
    try {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      const { title, description, thumbnailFile, videoFile, publish } = input;

      let thumbnailUpload;
      if (thumbnailFile) {
        thumbnailUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
          folder: 'thumbnails',
          resource_type: 'image',
        });
      }

      // Upload the video file to Cloudinary
      let videoUpload;
      if (videoFile) {
        videoUpload = await cloudinary.uploader.upload(videoFile.path, {
          folder: 'videos',
          resource_type: 'video',
          eager: [
            { streaming_profile: 'hd', format: 'm3u8' },
          ],
        });
      }

      // Create a new video entry in the database
      const video = await prisma.video.create({
        data: {
          title,
          description,
          thumbnailUrl: thumbnailUpload?.secure_url,
          videoUrl: videoUpload?.secure_url,
          publish,
          userId: ctx.user.id,
        },
      });

      return video;

    } catch (error) {
      console.error('Error uploading video:', error);

      // Throw a GraphQLError with additional details
      throw new GraphQLError("An error occurred while uploading the video.", {
        extensions: { code: 'INTERNAL_SERVER_ERROR', error },
      });
    }
  },
  addComment: async (_:any, args:{input:{videoId:string, message:string}}, ctx:GQLContext) => {
    if(!ctx.user){
      throw new GraphQLError("Unauthorized", {
        extensions: { code: '401' },
      });
    }
    return await prisma.comment.create({
      data:{
        message:args.input.message,
        userId:ctx.user.id,
        videoId:args.input.videoId
      },
      include:{
        user:true,
        video:true
      }
    });
  }
},







User: {
  Followers: async (parent: any) => {
    const followers = await prisma.followEngagement.findMany({
      where: {
        followingId: parent.id,
        engagementType: 'FOLLOW',
      },
      include: {
        follower: true,
      },
    });
    return followers.map((engagement) => engagement.follower);
  },
  Followings: async (parent: any) => {
    const followings = await prisma.followEngagement.findMany({
      where: {
        followerId: parent.id,
        engagementType: 'FOLLOW',
      },
      include: {
        following: true,
      },
    });
    return followings.map((engagement) => engagement.following);
  },
  Video: async (parent: any) => {
    return await prisma.video.findMany({
      where: {
        userId: parent.id,
      },
    });
  }
},
Announcement:{
  likeCount: async (parent: any) => {
  const count = await prisma.announcementEngagement.count({
      where:{
        announcementId:parent.id,
        engagementType:'LIKE'
      }
    });
     return count;
  },
   dislikeCount: async (parent:any) => {
    const count = await prisma.announcementEngagement.count({
      where:{
        announcementId:parent.id,
        engagementType:'DISLIKE'
      }
    })
      return count;
  }
},
AnnouncementEngagement: {
  announcement: async (parent:any, _args:any) => {
    return await prisma.announcement.findUnique({
      where: { id: parent.announcementId },
    });
  },
}
};

export default resolvers;
