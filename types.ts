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
};

export type UserAnnouncementsResponse = {
  getUserAnnouncements: AnnouncementType[];
};