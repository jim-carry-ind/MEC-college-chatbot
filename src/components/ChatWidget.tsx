import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickReplyButton from './QuickReplyButton';
import { Message, QuickReply } from '../types/chat';
import { getAIResponse } from '../utils/chatResponses';
import Squares from './Squares';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi 👋! I'm your College Query Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    { id: '1', text: '🎓 Admission Process', icon: '🎓' },
    { id: '2', text: '📚 Courses Offered', icon: '📚' },
    { id: '3', text: '🏫 Campus Life', icon: '🏫' },
    { id: '4', text: '💼 Placements', icon: '💼' },
    { id: '5', text: '📞 Contact Information', icon: '📞' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedState = localStorage.getItem('chatWidgetOpen');
    if (savedState === 'true') {
      setIsOpen(true);
    }
  }, []);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('chatWidgetOpen', String(newState));
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // ✅ FIXED: properly await getAIResponse
    try {
      const botResponse = await getAIResponse(text.trim());

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse, // ✅ string now, not Promise
        sender: 'bot',
        timestamp: new Date(),
      };

      // Optional delay for realistic typing effect
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('❌ Error getting AI response:', error);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
    <Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-2xl animate-pulse-slow'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xl">MEC</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">Mahendra Engineering College</h3>
              <p className="text-blue-100 text-sm">Query Assistant</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">CU</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <QuickReplyButton
                  key={reply.id}
                  reply={reply}
                  onClick={handleQuickReply}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
