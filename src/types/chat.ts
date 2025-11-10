export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  icon: string;
}
