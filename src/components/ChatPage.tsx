import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeft, Send, User, Bot, Loader2, ChevronDown, BrainCircuit } from 'lucide-react';
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
  reasoning?: string; 
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
  const client = new CozeAPI({
    // 使用用户提供的最新 Token
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

    setIsLoading(true);

    // 1. 构造用户消息
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      // 2. 构造 AI 预占位消息
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '', reasoning: '' }]);

      // 3. 调用流式接口
      // 关键修改：添加 auto_save_history，并使用字符串字面量代替 Enum
      const stream = await client.chat.stream({
        bot_id: BOT_ID,
        user_id: 'user_' + Date.now(),
        auto_save_history: true,
        additional_messages: [
          {
            role: 'user',
            content: userMsg.content,
            content_type: 'text',
          }
        ],
      });

      let fullContent = '';
      let fullReasoning = '';
      let hasReceivedData = false;

      for await (const part of stream) {
        // 关键修改：直接判断字符串事件名，避免 Enum 兼容性问题
        if (part.event === 'conversation.message.delta') {
          hasReceivedData = true;
          
          // 处理普通文本回复
          if (part.data?.content) {
            fullContent += part.data.content;
          }
          // 处理深度思考/推理内容
          if ((part.data as any)?.reasoning_content) {
             fullReasoning += (part.data as any).reasoning_content;
          }
          
          // 实时更新状态
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsgIndex = newMessages.findIndex(m => m.id === botMsgId);
            if (lastMsgIndex !== -1) {
              newMessages[lastMsgIndex] = {
                ...newMessages[lastMsgIndex],
                content: fullContent,
                reasoning: fullReasoning || newMessages[lastMsgIndex].reasoning
              };
            }
            return newMessages;
          });
        } else if (part.event === 'conversation.chat.failed') {
            console.error('Chat failed event:', part.data);
            throw new Error((part.data as any)?.last_error?.msg || 'Unknown error');
        }
      }

      if (!hasReceivedData && !fullContent) {
          // 如果流结束了但没有收到任何 delta 消息
          console.warn('Stream ended without data');
      }

    } catch (error: any) {
      console.error('Chat error details:', error);
      
      let errorMessage = '⚠️ 连接失败。';
      if (error?.message?.includes('401')) {
          errorMessage = '⚠️ 鉴权失败 (401)：Token 可能已过期或无效。请检查您的 Coze API Token。';
      } else if (error?.message?.includes('403')) {
          errorMessage = '⚠️ 权限不足 (403)：请确保您的 Token 有权限访问该 Bot。';
      } else {
          errorMessage = `⚠️ 发生错误: ${error?.message || '未知错误'}`;
      }

      setMessages(prev => {
          // 移除那个空白的占位消息，或者替换为错误消息
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'assistant' && !lastMsg.content) {
              lastMsg.content = errorMessage;
          } else {
              newMessages.push({
                  id: Date.now().toString(),
                  role: 'assistant',
                  content: errorMessage
              });
          }
          return newMessages;
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
              在线
            </p>
          </div>
        </div>
      </div>

      {/* 消息列表区域 */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex flex-col max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              
              <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* 头像 */}
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.role === 'user' ? 'bg-stone-200 ml-3' : 'bg-green-100 mr-3 border border-green-200'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-stone-600" /> : <Bot size={16} className="text-green-700" />}
                </div>

                {/* 气泡内容 */}
                <div className="flex flex-col gap-2">
                  
                  {/* 深度思考过程 (仅机器人) */}
                  {msg.role === 'assistant' && msg.reasoning && (
                    <details className="mb-2 group" open={isLoading}> {/* 加载时默认展开，完成后折叠 */}
                      <summary className="list-none cursor-pointer flex items-center text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors w-fit select-none">
                        <BrainCircuit size={14} className="mr-1.5 text-stone-400 group-hover:text-stone-600" />
                        深度思考过程
                        <ChevronDown size={12} className="ml-1 opacity-50 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-2 text-xs text-stone-600 bg-stone-100/50 p-3 rounded-lg border-l-2 border-stone-300 font-mono whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-top-2">
                        {msg.reasoning}
                        {isLoading && <span className="inline-block w-1.5 h-3 ml-1 bg-stone-400 animate-pulse"/>}
                      </div>
                    </details>
                  )}

                  {/* 文本内容 */}
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
                          {msg.content || (isLoading && !msg.reasoning ? '...' : '')}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* 加载动画 (如果正在等待回复且没有开始输出) */}
        {isLoading && messages[messages.length - 1].role === 'user' && (
           <div className="flex justify-start animate-in fade-in">
             <div className="flex flex-row">
               <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 mr-3 border border-green-200 flex items-center justify-center mt-1">
                 <Bot size={16} className="text-green-700" />
               </div>
               <div className="bg-white border border-stone-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                 <span className="text-xs text-stone-400">麦小吉正在思考中...</span>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入区域 */}
      <div className="bg-white border-t border-stone-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto relative">
          
          {/* 输入框主体 */}
          <div className="relative flex items-end border border-stone-300 rounded-2xl bg-stone-50 focus-within:ring-2 focus-within:ring-green-500/50 focus-within:border-green-500 transition-all">
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="请输入您的问题..."
              className="w-full bg-transparent border-none focus:ring-0 py-3 px-4 resize-none max-h-32 min-h-[48px] text-stone-800 placeholder:text-stone-400"
              rows={1}
              disabled={isLoading}
              style={{ minHeight: '48px' }}
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`m-1.5 p-2.5 rounded-xl transition-all flex items-center justify-center ${
                !input.trim() || isLoading
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-stone-400 mt-2">
          内容由 AI 生成，仅供参考。
        </p>
      </div>
    </div>
  );
};