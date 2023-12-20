export type ConversationT = {
  type: 'sent' | 'received';
  message: string;
  emotions?: { [emotion: string]: number };
}

export type PropmptResponseT = {
  content: string;
  emotions?: { [emotion: string]: number };
}