import { QuickReply } from '../types/chat';

interface QuickReplyButtonProps {
  reply: QuickReply;
  onClick: (text: string) => void;
}

export default function QuickReplyButton({ reply, onClick }: QuickReplyButtonProps) {
  return (
    <button
      onClick={() => onClick(reply.text)}
      className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors border border-blue-200 hover:border-blue-300"
    >
      {reply.text}
    </button>
  );
}
