export interface Analysis {
  id: number;
  analyst: string;
  avatar: string;
  title: string;
  sport: string;
  league: string;
  content: string;
  prediction: string;
  confidence: number;
  rating: number;
  views: number;
  likes: number;
  time: string;
  tags: string[];
}

export interface GroupMessageData {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  isCurrentUser: boolean;
}

export interface SportOption {
  value: string;
  label: string;
}
