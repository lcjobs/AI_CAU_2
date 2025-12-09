import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeft, Send, User, Bot, Loader2, Paperclip, FileText, X, ChevronDown, BrainCircuit } from 'lucide-react';
import { CozeAPI, RoleType, ChatEventType } from '@coze/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatPageProps {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  // 新增：思考过程字段
  reasoning?: string; 
  // 新增：附件信息
  attachment?: {
    name: string;
    type: string;
  };
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // 新增：上传文件状态
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是麦小吉，中国农业大学新生专属 AI 助手。\n\n你可以问我：\n- “我是本科新生，综测分怎么算？”\n- “我是研究生，帮我查一下玉米育种的最新文献。”\n\n**新功能**：现在支持上传 PDF 或图片，让我帮你阅读文献或识别截图哦！'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 初始化 API 客户端
  // 注意：Token 包含在前端代码中存在安全风险，建议在生产环境通过后端转发。
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
  }, [messages, messages.length]); // 依赖项增加 messages.length 确保新增消息时滚动

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 处理文件上传并发送
  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading || isUploading) return;

    setIsLoading(true);
    let uploadedFileId = '';

    // 1. 如果有文件，先上传文件
    if (selectedFile) {
      setIsUploading(true);
      try {
        const fileRes = await client.files.upload({
          file: selectedFile,
        });
        uploadedFileId = fileRes.id;
      } catch (error) {
        console.error("File upload failed:", error);
        alert("文件上传失败，请重试");
        setIsLoading(false);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    // 2. 构造用户消息
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      attachment: selectedFile ? { name: selectedFile.name, type: selectedFile.type } : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedFile(null); // 清空文件选择

    try {
      // 3. 构造 AI 预占位消息
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '', reasoning: '' }]);

      // 4. 准备发送给 Coze 的内容
      let additionalMessages = [];

      if (uploadedFileId) {
        // 多模态消息构造 (Object String 格式)
        const multiModalContent = [
          { type: 'text', text: userMsg.content || "请分析这个文件" },
          { type: 'file', file_id: uploadedFileId }
        ];
        
        additionalMessages.push({
          role: RoleType.User,
          content: JSON.stringify(multiModalContent),
          content_type: 'object_string', // 关键：指定为对象字符串
        });
      } else {
        // 纯文本消息
        additionalMessages.push({
          role: RoleType.User,
          content: userMsg.content,
          content_type: 'text',
        });
      }

      // 5. 调用流式接口
      const stream = await client.chat.stream({
        bot_id: BOT_ID,
        user_id: 'user_' + Date.now(),
        additional_messages: additionalMessages,
      });

      let fullContent = '';
      let fullReasoning = '';

      for await (const part of stream) {
        if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
          // 处理普通文本回复
          if (part.data?.content) {
            fullContent += part.data.content;
          }
          // 处理深度思考/推理内容 (如果模型支持)
          // 注意：不同模型返回字段可能不同，这里兼容 reasoning_content
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
                reasoning: fullReasoning || newMessages[lastMsgIndex].reasoning // 保留之前的思考，或者更新
              };
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: '⚠️ 抱歉，连接麦小吉大脑时出现错误，可能是网络问题或 Token 过期。' 
      }]);
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
              在线 | 支持文件上传
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
                  
                  {/* 用户附件显示 */}
                  {msg.attachment && (
                     <div className={`flex items-center p-2 rounded-lg text-sm mb-1 ${
                        msg.role === 'user' ? 'bg-green-800 text-green-100' : 'bg-stone-100'
                     }`}>
                        <Paperclip size={14} className="mr-2" />
                        <span className="truncate max-w-[150px]">{msg.attachment.name}</span>
                     </div>
                  )}

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
          
          {/* 文件预览条 */}
          {selectedFile && (
            <div className="absolute -top-12 left-0 right-0 flex items-center bg-stone-50 border border-stone-200 rounded-t-lg px-3 py-2 animate-in slide-in-from-bottom-2">
              <FileText className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-stone-700 truncate flex-1">{selectedFile.name}</span>
              <button onClick={() => setSelectedFile(null)} className="text-stone-400 hover:text-red-500">
                <X size={16} />
              </button>
            </div>
          )}

          {/* 输入框主体 */}
          <div className={`relative flex items-end border border-stone-300 rounded-2xl bg-stone-50 focus-within:ring-2 focus-within:ring-green-500/50 focus-within:border-green-500 transition-all ${selectedFile ? 'rounded-tl-none rounded-tr-none' : ''}`}>
            
            {/* 上传按钮 */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 ml-1 text-stone-400 hover:text-green-700 transition-colors"
              title="上传文件"
              disabled={isLoading}
            >
              <Paperclip size={20} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={selectedFile ? "请输入关于该文件的问题..." : "请输入您的问题... (支持上传文档)"}
              className="w-full bg-transparent border-none focus:ring-0 py-3 px-2 resize-none max-h-32 min-h-[48px] text-stone-800 placeholder:text-stone-400"
              rows={1}
              disabled={isLoading}
              style={{ minHeight: '48px' }}
            />
            
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !selectedFile) || isLoading}
              className={`m-1.5 p-2.5 rounded-xl transition-all flex items-center justify-center ${
                (!input.trim() && !selectedFile) || isLoading
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-stone-400 mt-2">
          支持 PDF、Word、图片分析。内容由 AI 生成，仅供参考。
        </p>
      </div>
    </div>
  );
};