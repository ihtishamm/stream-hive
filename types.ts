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
};
export type userResponse = {
  getUserById: User;
};
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