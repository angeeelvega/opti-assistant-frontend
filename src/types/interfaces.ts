export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export interface DrawerProps {
  isOpen: boolean;
  isDesktop: boolean;
  onToggle: () => void;
}

export interface ChatMessagesProps {
  messages: Message[];
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
