export type User = {
  id: string;
  nickname: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  created_at: string;
};

export type InviteLink = {
  id: string;
  user_id: string;
  code: string;
  expires_at: string | null;
  created_at: string;
};
