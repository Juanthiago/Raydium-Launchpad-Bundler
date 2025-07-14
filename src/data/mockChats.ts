import { ReactNode } from "react";

export interface Message {
  senderName: ReactNode;
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
}

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Maria Silva",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    messages: [
      {
        id: "m1",
        senderName: "other",
        sender: "other",
        content: "Oi! Tudo bem?",
        timestamp: "10:00",
      },
      {
        id: "m2",
        senderName: "me",
        sender: "me",
        content: "Oi Maria! Tudo sim, e você?",
        timestamp: "10:01",
      },
      {
        id: "m3",
        senderName: "other",
        sender: "other",
        content: "Estou bem também!",
        timestamp: "10:02",
      },
    ],
  },
  {
    id: "2",
    name: "João Pedro",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      {
        id: "m1",
        senderName: "me",
        sender: "me",
        content: "Bom dia, João!",
        timestamp: "09:00",
      },
      {
        id: "m2",
        senderName: "other",
        sender: "other",
        content: "Bom dia! Como posso ajudar?",
        timestamp: "09:01",
      },
    ],
  },
];
