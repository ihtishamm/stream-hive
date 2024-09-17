import {
    type Video,
    type User,
    type VideoEngagement,
    type FollowEngagement,
    type Announcement,
    PrismaClient,
    type AnnouncementEngagement,
    type Comment,
    type Playlist,
    type PlaylistHasVideo,
} from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

// File paths
const usersFile = path.join(__dirname, "data/user.json");
const videosFile = path.join(__dirname, "data/video.json");
const videoEngagementsFile = path.join(__dirname, "data/videoEngagement.json");
const followEngagementsFile = path.join(__dirname, "data/followEngagement.json");
const announcementsFile = path.join(__dirname, "data/announcement.json");
const announcementEngagementsFile = path.join(__dirname, "data/announcementEngagement.json");
const commentsFile = path.join(__dirname, "data/comment.json");
const playlistsFile = path.join(__dirname, "data/playlist.json");
const playlistHasVideoFile = path.join(__dirname, "data/playlistHasVideo.json");

// Load data from JSON files
const users: User[] = JSON.parse(fs.readFileSync(usersFile, "utf-8")) as User[];
const videos: Video[] = JSON.parse(fs.readFileSync(videosFile, "utf-8")) as Video[];
const videoEngagements: VideoEngagement[] = JSON.parse(fs.readFileSync(videoEngagementsFile, "utf-8")) as VideoEngagement[];
const followEngagements: FollowEngagement[] = JSON.parse(fs.readFileSync(followEngagementsFile, "utf-8")) as FollowEngagement[];
const announcements: Announcement[] = JSON.parse(fs.readFileSync(announcementsFile, "utf-8")) as Announcement[];
const announcementEngagements: AnnouncementEngagement[] = JSON.parse(fs.readFileSync(announcementEngagementsFile, "utf-8")) as AnnouncementEngagement[];
const comments: Comment[] = JSON.parse(fs.readFileSync(commentsFile, "utf-8")) as Comment[];
const playlists: Playlist[] = JSON.parse(fs.readFileSync(playlistsFile, "utf-8")) as Playlist[];
const playlistHasVideos: PlaylistHasVideo[] = JSON.parse(fs.readFileSync(playlistHasVideoFile, "utf-8")) as PlaylistHasVideo[];

// Function to hash a password
const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

// Function to process items in chunks
async function processInChunks<T, U>(items: T[], chunkSize: number, processItem: (item: T) => Promise<U>): Promise<U[]> {
    const results: U[] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        const chunkPromises = chunk.map(processItem);
        results.push(...(await Promise.all(chunkPromises)));
    }
    return results;
}

// Function to generate sequential IDs
function generateNextId(start: number, end: number) {
    let current = start;
    return function getNextId() {
        const nextId = current;
        current = current >= end ? start : current + 1;
        return nextId.toString();
    };
}

// ID generators
const getNextVideoId = generateNextId(1, 31);
const getNextUserId = generateNextId(164, 178);
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME || "";

// Main function to seed data
async function main() {
    // Delete all records from tables
    // await prisma.user.deleteMany();
    // await prisma.video.deleteMany();
    // await prisma.videoEngagement.deleteMany();
    // await prisma.followEngagement.deleteMany();
    // await prisma.announcement.deleteMany();
    // await prisma.announcementEngagement.deleteMany();
    // await prisma.comment.deleteMany();
    // await prisma.playlist.deleteMany();
    // await prisma.playlistHasVideo.deleteMany();

    await processInChunks(users, 1, (user) =>
        prisma.user.upsert({
            where: { id: user.id },
            update: {
                ...user,
                password: hashPassword("defaultPassword123"), // Use a hashed default password
                image: user.image ? `https://res.cloudinary.com/${cloudinaryName}/${user.image}` : null,
                backgroundImage: user.backgroundImage ? `https://res.cloudinary.com/${cloudinaryName}/${user.backgroundImage}` : null,
            },
            create: {
                ...user,
                password: hashPassword("defaultPassword123"), // Use a hashed default password
                image: user.image ? `https://res.cloudinary.com/${cloudinaryName}/${user.image}` : null,
                backgroundImage: user.backgroundImage ? `https://res.cloudinary.com/${cloudinaryName}/${user.backgroundImage}` : null,
            },
        })
    );

    await processInChunks(videos, 1, (video) =>
        prisma.video.upsert({
            where: { id: video.id },
            update: {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
                thumbnailUrl: `https://res.cloudinary.com/${cloudinaryName}/${video.thumbnailUrl}`,
                videoUrl: `https://res.cloudinary.com/${cloudinaryName}/${video.videoUrl}`,
            },
            create: {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
                thumbnailUrl: `https://res.cloudinary.com/${cloudinaryName}/${video.thumbnailUrl}`,
                videoUrl: `https://res.cloudinary.com/${cloudinaryName}/${video.videoUrl}`,
            },
        })
    );

    await processInChunks(videoEngagements, 1, async (videoEngagement) => {
        const userId = videoEngagement.userId;
        const videoId = videoEngagement.videoId;

        if (userId && videoId) {
            const userExists = await prisma.user.findUnique({ where: { id: userId } });
            const videoExists = await prisma.video.findUnique({ where: { id: videoId } });

            if (userExists && videoExists) {
                return prisma.videoEngagement.create({ data: videoEngagement });
            } else {
                console.warn(`Skipping video engagement with invalid references: userId ${userId}, videoId ${videoId}`);
            }
        } else {
            console.warn(`Skipping video engagement with null userId or videoId: userId ${userId}, videoId ${videoId}`);
        }
    });

    await processInChunks(followEngagements, 1, async (followEngagement) => {
        const existingFollowEngagements = await prisma.followEngagement.findMany({
            where: {
                followerId: followEngagement.followerId,
                followingId: followEngagement.followingId,
            },
        });
        if (existingFollowEngagements.length === 0) {
            return prisma.followEngagement.create({ data: followEngagement });
        } else {
            return;
        }
    });

    await processInChunks(announcements, 1, (announcement) =>
        prisma.announcement.create({ data: announcement })
    );

    await processInChunks(announcementEngagements, 1, async (announcementEngagement) => {
        const existingAnnouncementEngagements = await prisma.announcementEngagement.findMany({
            where: {
                announcementId: announcementEngagement.announcementId,
                userId: announcementEngagement.userId,
            },
        });
        if (existingAnnouncementEngagements.length === 0) {
            return prisma.announcementEngagement.create({ data: announcementEngagement });
        } else {
            return;
        }
    });

    await processInChunks(comments, 1, (comment) =>
        prisma.comment.upsert({
            where: { id: comment.id },
            update: {
                ...comment,
                videoId: getNextVideoId(),
                userId: getNextUserId(),
                createdAt: comment.createdAt ? new Date(comment.createdAt) : undefined,
            },
            create: {
                ...comment,
                userId: getNextUserId(),
                videoId: getNextVideoId(),
                createdAt: comment.createdAt ? new Date(comment.createdAt) : undefined,
            },
        })
    );

    await processInChunks(playlists, 1, async (playlist) =>
        prisma.playlist.upsert({
            where: { id: playlist.id },
            update: {
                ...playlist,
                userId: getNextUserId(),
                createdAt: playlist.createdAt ? new Date(playlist.createdAt) : undefined,
            },
            create: {
                ...playlist,
                userId: getNextUserId(),
                createdAt: playlist.createdAt ? new Date(playlist.createdAt) : undefined,
            },
        })
    );

    await processInChunks(playlistHasVideos, 1, (playlistHasVideo) =>
        prisma.playlistHasVideo.create({ data: playlistHasVideo })
    );
}

// Execute main function
main()
    .catch((e) => console.error(e))
    .finally(() => {
        void prisma.$disconnect();
    });
