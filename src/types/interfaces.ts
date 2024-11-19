export interface Message {
  text: string | JSX.Element;
  sender: 'user' | 'bot';
}

export interface ChatMessagesProps {
  messages: Message[];
}
export interface DrawerProps {
  isOpen: boolean;
  isDesktop: boolean;
  onToggle: () => void;
}

export interface ChatInputProps {
  onSendMessage: (message: string | JSX.Element, isBot: boolean) => void;
}
