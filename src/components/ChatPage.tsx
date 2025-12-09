import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeft, Send, User, Bot, Loader2 } from 'lucide-react';
import { CozeAPI } from '@coze/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatPageProps {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是麦小吉，中国农业大学新生专属 AI 助手。\n\n你可以问我：\n- “我是本科新生，综测分怎么算？”\n- “我是研究生，帮我查一下玉米育种的最新文献。”'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 初始化 API 客户端
  // 使用您提供的最新 Token
  const client = new CozeAPI({
    token: 'cztei_hIfYjhsBOVexNPahSXBY0zpZeNC3Owzm1wJnGVoZN3kb6GSAV40eQLVwfBzkLRV4z', 
    baseURL: 'https://api.coze.cn',
    allowPersonalAccessTokenInBrowser: true 
  });

  const BOT_ID = '7578514424156356608'; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 创建一个新的空消息用于流式接收
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);

      // 调用 Coze API
      // 使用 as any 强制类型转换，解决 TS 构建报错
      const stream = await client.chat.stream({
        bot_id: BOT_ID,
        user_id: 'user_' + Date.now(), // 生成一个随机用户ID
        additional_messages: [
          {
            role: 'user' as any,
            content: userMsg.content,
            content_type: 'text' as any,
            type: 'question' as any // 按照您的示例添加 type 字段
          },
        ],
      });

      let fullContent = '';

      for await (const part of stream) {
        // 调试日志：查看真实返回的事件类型
        console.log('Stream Event:', part.event, part.data);

        // 处理消息增量事件
        if (part.event === 'conversation.message.delta') {
          const content = part.data?.content || '';
          fullContent += content;
          
          setMessages(prev => {
            const newMessages = [...prev];
            const index = newMessages.findIndex(m => m.id === botMsgId);
            if (index !== -1) {
              newMessages[index] = {
                ...newMessages[index],
                content: fullContent
              };
            }
            return newMessages;
          });
        }
        // 处理对话完成事件（以防 delta 丢失）
        if (part.event === 'conversation.message.completed') {
           const content = part.data?.content || '';
           if (content && content.length > fullContent.length) {
              fullContent = content;
              setMessages(prev => {
                const newMessages = [...prev];
                const index = newMessages.findIndex(m => m.id === botMsgId);
                if (index !== -1) {
                  newMessages[index] = {
                    ...newMessages[index],
                    content: fullContent
                  };
                }
                return newMessages;
              });
           }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        // 如果最后一条消息是空的（还在加载），移除它
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].content === '') {
            newMessages.pop();
        }
        return [...newMessages, { 
            id: Date.now().toString(), 
            role: 'assistant', 
            content: `⚠️ 连接错误: ${error instanceof Error ? error.message : '未知错误'}\n\n请检查您的网络连接或 Token 是否有效。` 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 overflow-hidden">
      {/* 顶部导航条 */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center shadow-sm flex-shrink-0 z-50">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3 border border-green-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-stone-900">麦小吉 AI 助手</h1>
            <p className="text-xs text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              在线中
            </p>
          </div>
        </div>
      </div>

      {/* 消息列表区域 */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* 头像 */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-stone-200 ml-3' : 'bg-green-100 mr-3 border border-green-200'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-stone-600" /> : <Bot size={16} className="text-green-700" />}
              </div>

              {/* 气泡 */}
              <div className={`rounded-2xl px-5 py-3 shadow-sm text-sm md:text-base leading-relaxed overflow-hidden ${
                msg.role === 'user' 
                  ? 'bg-green-700 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
              }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm prose-stone max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content || '...'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role === 'user' && (
           <div className="flex justify-start">
             <div className="flex flex-row">
               <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 mr-3 border border-green-200 flex items-center justify-center mt-1">
                 <Bot size={16} className="text-green-700" />
               </div>
               <div className="bg-white border border-stone-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm">
                 <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入区域 */}
      <div className="bg-white border-t border-stone-200 p-4 pb-6">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="请输入您的问题... (Shift+Enter 换行)"
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-4 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none max-h-32 min-h-[52px]"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-stone-400 mt-2">
          内容由 AI 生成，仅供参考。
        </p>
      </div>
    </div>
  );
};