export type GQLContext = {
  user?: { id: string; name: string; email: string; createdAt: string } | null
}
export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  handle: string | null;
  image: string | null;
  backgroundImage: string | null;
  description: string | null;
  videosCount: number;
  followingCount: number;
  followersCount: number;
  hasFollowed: boolean;
};
export type userResponse = {
  getUserById: User;
};

export type Video = {
  id: string;
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
  description: string;
  publish: boolean
  createdAt: Date;
  user: User
  viewsCount: number
}
export type videoResponse = {
  getallVideos: Video[]
}
export type userVideosResponse = {
  getUservideos: Video[]
}

export type userFollowersResponse = {
  getUserFollowers: User[]
}
export type SingleVideoResponse = {
  getVideo: Video
}
export type AnnouncementType = {
  id: string;
  user: {
    name: string;
    handle: string;
    image: string;
    id: string
  };
  createdAt: string;
  message: string;
  dislikeCount: number;
  likeCount: number;
  hasLiked: boolean;
  hasDisliked: boolean;
};

export type UserAnnouncementsResponse = {
  getUserAnnouncements: AnnouncementType[];
};

export type CloudinaryUploadResponse = {
  secure_url: string;
  url: string;
  public_id: string;
  format: string;
};
