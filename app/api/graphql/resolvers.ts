import { GQLContext, SignInInput, SignUpInput } from "@/types";
import { signin, signup } from "@/lib/auth";
import { GraphQLError, } from "graphql";
import prisma from "@/lib/db";
import { GraphQLUpload } from "graphql-upload-ts";



type SignInArgs = {
  input: SignInInput;
};

type SignUpArgs = {
  input: SignUpInput;
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    me: async (_: any, __: any, ctx: GQLContext) => {
      return ctx.user
    },
    getUserById: async (_: any, args: { userId: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: args.userId },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(`Error fetching user`);
      }
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
    getUserAnnouncements: async (_: any, args: { userid: string }) => {
      return await prisma.announcement.findMany({
        where: {
          userId: args.userid,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getUserFollowers: async (_: any, args: { userId: string }) => {
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
    getUserFollowing: async (_: any, args: { userId: string }) => {
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
        where: {
          publish: true,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getUservideos: async (_: any, args: { userId: string }) => {
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
    getVideo: async (_: any, args: { videoId: string }) => {
      return await prisma.video.findUnique({
        where: {
          id: args.videoId,
        },
        include: {
          user: true,
        },
      });
    },
    getVideoComments: async (_: any, args: { videoId: string }) => {
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
    },
    getUserPlaylists: async (_: any, args: { userId: string }) => {
      return await prisma.playlist.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          user: true,
          videos: {
            include: {
              video: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    getPlaylistVideos: async (_: any, args: { playlistId: string }) => {
      const playlistvideos = await prisma.playlistHasVideo.findMany({
        where: {
          playlistId: args.playlistId,
        },
        include: {
          video: true,
          playlist: true,
        },
      });
      return playlistvideos.map(p => p.video);
    },
    searchVideos: async (_: any, args: { query: string }) => {
      return await prisma.video.findMany({
        where: {
          OR: [
            { title: { contains: args.query, mode: 'insensitive' } },
            { description: { contains: args.query, mode: 'insensitive' } },
            { user: { name: { contains: args.query, mode: 'insensitive' } } },
            { user: { handle: { contains: args.query, mode: 'insensitive' } } },
          ],
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
    createUser: async (_: any, args: SignUpArgs) => {
      const data = await signup(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('could not create user', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
    signIn: async (_: any, args: SignInArgs) => {
      const data = await signin(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
    createAnnouncement: async (_: any, args: { input: { message: string } }, ctx: GQLContext) => {
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
    editAnnouncement: async (_: any, args: { input: { id: string, message: string } }, ctx: GQLContext) => {
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
    deleteAnnouncement: async (_: any, args: { id: string }, ctx: GQLContext) => {
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
        await prisma.followEngagement.delete({
          where: {
            followerId_followingId: { followerId: ctx.user.id, followingId: args.input.followingId },
          },
        });
        return "unfollowed";


      };

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

    likeAnnouncement: async (_: any, args: { input: { announcementId: string } }, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }

      const existedEngagement = await prisma.announcementEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          announcementId: args.input.announcementId
        }

      });
      console.log(existedEngagement, 'existedEngagement');
      if (existedEngagement) {
        if (existedEngagement.engagementType === 'LIKE') {
          await prisma.announcementEngagement.delete({
            where: {
              userId_announcementId: { userId: ctx.user.id, announcementId: args.input.announcementId }
            }
          });
          return "unliked";
        }
        else if (existedEngagement.engagementType === 'DISLIKE') {
          await prisma.announcementEngagement.update({
            where: {
              userId_announcementId: { userId: ctx.user.id, announcementId: args.input.announcementId }
            },
            data: {
              engagementType: 'LIKE'
            }
          });
        }
      }

      return await prisma.announcementEngagement.create({
        data: {
          userId: ctx.user.id,
          announcementId: args.input.announcementId,
          engagementType: 'LIKE'
        },
        include: {
          announcement: true
        }
      });

    },
    dislikeAnnouncement: async (_: any, args: { input: { announcementId: string } }, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }

      // Find if an engagement already exists for this user and announcement
      const existedEngagement = await prisma.announcementEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          announcementId: args.input.announcementId,
        },
      });

      if (existedEngagement) {
        // If it's already disliked, remove the engagement (undo dislike)
        if (existedEngagement.engagementType === 'DISLIKE') {
          await prisma.announcementEngagement.delete({
            where: {
              userId_announcementId: { userId: ctx.user.id, announcementId: args.input.announcementId },
            },
          });
          return "undisliked";
        }
        // If it's a like, update it to dislike
        else if (existedEngagement.engagementType === 'LIKE') {
          await prisma.announcementEngagement.update({
            where: {
              userId_announcementId: { userId: ctx.user.id, announcementId: args.input.announcementId },
            },
            data: {
              engagementType: 'DISLIKE',
            },
          });
          return "disliked";
        }
      }
      return await prisma.announcementEngagement.create({
        data: {
          userId: ctx.user.id,
          announcementId: args.input.announcementId,
          engagementType: 'DISLIKE',
        },
        include: {
          announcement: true,
        },
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


        console.log("thumbnailFile", await thumbnailFile)
        console.log("videoFile", await videoFile);

        // let thumbnailUpload: CloudinaryUploadResponse | undefined;
        // if (thumbnailFile) {
        //   const { createReadStream, filename } = await thumbnailFile;

        //   // Stream the thumbnail file to Cloudinary
        //   thumbnailUpload = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
        //     const stream = cloudinary.uploader.upload_stream(
        //       {
        //         folder: 'thumbnails',
        //         resource_type: 'image',
        //       },
        //       (error, result) => {
        //         if (error) reject(error);
        //         resolve(result as CloudinaryUploadResponse);  // Ensure proper type casting
        //       }
        //     );
        //     createReadStream().pipe(stream);
        //   });
        // }

        // let videoUpload: CloudinaryUploadResponse | undefined;
        // if (videoFile) {
        //   const { createReadStream, filename } = await videoFile;

        //   videoUpload = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
        //     const stream = cloudinary.uploader.upload_stream(
        //       {
        //         folder: 'videos',
        //         resource_type: 'video',
        //         eager: [{ streaming_profile: 'hd', format: 'm3u8' }],
        //       },
        //       (error, result) => {
        //         if (error) reject(error);
        //         resolve(result as CloudinaryUploadResponse);  // Ensure proper type casting
        //       }
        //     );
        //     createReadStream().pipe(stream);
        //   });
        // }

        const video = await prisma.video.create({
          data: {
            title,
            description,
            thumbnailUrl: "https://res.cloudinary.com/dx3xjvzvz/image/upload/v1633660734/thumbnails/ytdefault.jpg",
            videoUrl: "https://res.cloudinary.com/dx3xjvzvz/video/upload/v1633660734/videos/ytdefault.mp4",
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


    addComment: async (_: any, args: { input: { videoId: string, message: string } }, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }
      return await prisma.comment.create({
        data: {
          message: args.input.message,
          userId: ctx.user.id,
          videoId: args.input.videoId
        },
        include: {
          user: true,
          video: true
        }
      });
    },
    createPlaylist: async (_: any, args: { input: { title: string, description: string, videoId: string } }, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }

      const video = await prisma.video.findUnique({
        where: { id: args.input.videoId },
      });

      if (!video) {
        throw new GraphQLError("Video not found", {
          extensions: { code: '404' },
        });
      }



      const playlist = await prisma.playlist.create({
        data: {
          title: args.input.title,
          description: args.input.description,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
          videos: {
            create: {
              video: {
                connect: {
                  id: args.input.videoId,
                },
              },
            },
          },
        },
        include: {
          videos: {
            include: {
              video: true,
            },
          },
          user: true,
        },
      });
      return playlist;
    },
    addVideoToPlaylist: async (_: any, args: { input: { playlistId: string, videoId: string } }, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: '401' },
        });
      }

      const playlist = await prisma.playlist.findUnique({
        where: { id: args.input.playlistId },
      });

      if (!playlist) {
        throw new GraphQLError("Playlist not found", {
          extensions: { code: '404' },
        });
      }

      const video = await prisma.video.findUnique({
        where: { id: args.input.videoId },
      });

      if (!video) {
        throw new GraphQLError("Video not found", {
          extensions: { code: '404' },
        });
      }

      const playlistHasVideo = await prisma.playlistHasVideo.create({
        data: {
          playlist: {
            connect: {
              id: args.input.playlistId,
            },
          },
          video: {
            connect: {
              id: args.input.videoId,
            },
          },
        },
        include: {
          playlist: true,
          video: true,
        },
      });

      return playlistHasVideo;
    }


  },







  User: {
    hasFollowed: async (parent: any, _args: any, ctx: GQLContext) => {
      if (!ctx.user) {
        return false
      }
      const followEngagement = await prisma.followEngagement.findFirst({
        where: {
          followerId: ctx.user.id,
          followingId: parent.id,
          engagementType: 'FOLLOW',
        },
      });
      return Boolean(followEngagement);
    },
    followersCount: async (parent: any) => {
      const count = await prisma.followEngagement.count({
        where: {
          followingId: parent.id,
          engagementType: 'FOLLOW',
        },
      });
      return count;
    },
    followingCount: async (parent: any) => {
      const count = await prisma.followEngagement.count({
        where: {
          followerId: parent.id,
          engagementType: 'FOLLOW',
        },
      });
      return count;
    },
    videosCount: async (parent: any) => {
      const count = await prisma.video.count({
        where: {
          userId: parent.id,
        },
      });
      return count;
    },
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
  Video: {
    user: async (parent: any) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
    viewsCount: async (parent: any) => {
      const count = await prisma.videoEngagement.count({
        where: {
          videoId: parent.id,
          engagementType: 'VIEW',
        },
      });
      return count;
    },
    likeCount: async (parent: any) => {
      const count = await prisma.videoEngagement.count({
        where: {
          videoId: parent.id,
          engagementType: 'LIKE',
        },
      });
      return count;
    },
    dislikeCount: async (parent: any) => {
      const count = await prisma.videoEngagement.count({
        where: {
          videoId: parent.id,
          engagementType: 'DISLIKE',
        },
      });
      return count;
    },
    hasLiked: async (parent: any, _args: any, ctx: GQLContext) => {
      if (!ctx.user) {
        return false;
      }
      const engagement = await prisma.videoEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          videoId: parent.id,
          engagementType: 'LIKE',
        },
      });
      return Boolean(engagement);
    },
    hasDisliked: async (parent: any, _args: any, ctx: GQLContext) => {
      if (!ctx.user) {
        return false;
      }
      const engagement = await prisma.videoEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          videoId: parent.id,
          engagementType: 'DISLIKE',
        },
      });
      return Boolean(engagement);
    }

  },
  Announcement: {
    likeCount: async (parent: any) => {
      const count = await prisma.announcementEngagement.count({
        where: {
          announcementId: parent.id,
          engagementType: 'LIKE'
        }
      });
      return count;
    },
    dislikeCount: async (parent: any) => {
      const count = await prisma.announcementEngagement.count({
        where: {
          announcementId: parent.id,
          engagementType: 'DISLIKE'
        }
      })
      return count;
    },
    hasLiked: async (parent: any, _args: any, ctx: GQLContext) => {
      if (!ctx.user) {
        return false;
      }
      const engagement = await prisma.announcementEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          announcementId: parent.id,
          engagementType: 'LIKE'
        }
      });
      return Boolean(engagement);
    },
    hasDisliked: async (parent: any, _args: any, ctx: GQLContext) => {
      if (!ctx.user) {
        return false;
      }
      const engagement = await prisma.announcementEngagement.findFirst({
        where: {
          userId: ctx.user.id,
          announcementId: parent.id,
          engagementType: 'DISLIKE'
        }
      });
      return Boolean(engagement);
    },
  },
  AnnouncementEngagement: {
    announcement: async (parent: any, _args: any) => {
      return await prisma.announcement.findUnique({
        where: { id: parent.announcementId },
      });
    },
  }
};

export default resolvers;
