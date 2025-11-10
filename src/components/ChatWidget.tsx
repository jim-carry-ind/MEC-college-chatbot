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
    { id: '1', text: '🎓 Admission', icon: '🎓' },
    { id: '2', text: '📚 Courses', icon: '📚' },
    { id: '3', text: '🏫 Campus', icon: '🏫' },
    { id: '4', text: '💼 Placements', icon: '💼' },
    { id: '5', text: '📞 Contact', icon: '📞' },
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

    try {
      const botResponse = await getAIResponse(text.trim());

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

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
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`
          fixed z-50 flex items-center justify-center rounded-full shadow-lg 
          transition-all duration-300 transform hover:scale-110
          w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
          bottom-4 right-4 sm:bottom-6 sm:right-6
          ${isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-2xl animate-pulse-slow'
          }
        `}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </button>

      {isOpen && (
        <div className="
          fixed z-40 flex flex-col bg-white rounded-2xl shadow-2xl 
          animate-slide-up
          /* Mobile First - Reduced height */
          w-[calc(100vw-2rem)] h-[60vh]
          bottom-20 left-4 right-4
          /* Tablet - Reduced height */
          sm:w-96 sm:h-[500px] sm:bottom-24 sm:left-auto sm:right-6
          /* Desktop - Reduced height */
          lg:w-[400px] lg:h-[550px]
        ">
          {/* Squares Background - Only inside chat widget */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <Squares
              speed={0.5}
              squareSize={30}
              direction='diagonal'
              borderColor='#e5e7eb'
              hoverFillColor='#dbeafe'
            />
          </div>

          {/* Header - Compact */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-3 sm:p-4 flex items-center space-x-3 relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-base sm:text-lg">MEC</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                Mahendra Engineering College
              </h3>
              <p className="text-blue-100 text-xs">Query Assistant</p>
            </div>
          </div>

          {/* Messages Area - Compact */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-3 relative z-10">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-semibold">CU</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies & Input - Compact */}
          <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm border-t border-gray-200 relative z-10">
            {/* Quick Replies */}
            <div className="mb-2 flex flex-wrap gap-1">
              {quickReplies.map((reply) => (
                <QuickReplyButton
                  key={reply.id}
                  reply={reply}
                  onClick={handleQuickReply}
                />
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="
                  flex-1 px-3 py-2 
                  border border-gray-300 rounded-full 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  text-black text-sm
                  placeholder-gray-500
                "
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="
                  w-9 h-9 sm:w-10 sm:h-10
                  bg-blue-600 hover:bg-blue-700 
                  disabled:bg-gray-300 disabled:cursor-not-allowed 
                  rounded-full flex items-center justify-center 
                  transition-colors flex-shrink-0
                "
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}