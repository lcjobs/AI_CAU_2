import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface ChatPageProps {
  onBack: () => void;
}

declare global {
  interface Window {
    CozeWebSDK: any;
  }
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    
    // 清理之前的 SDK 实例（如果有）以防止重复
    const existingContainer = document.getElementById('coze-chat-container');
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    const scriptUrl = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js";
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
      if (window.CozeWebSDK && containerRef.current) {
        try {
          // 初始化 WebChatClient，使用用户提供的具体配置
          new window.CozeWebSDK.WebChatClient({
            config: {
              type: 'bot',
              bot_id: '7578514424156356608', // 用户提供的 Bot ID
              isIframe: false,
            },
            auth: {
              type: 'token',
              token: 'cztei_ljcihtX7X7OqyO8svFCeAc0pmlZuHN8aBmUy66P1sFaq7lG6HvzwDfISfObJSQyML', // 用户提供的 Token
              onRefreshToken: async () => 'cztei_ljcihtX7X7OqyO8svFCeAc0pmlZuHN8aBmUy66P1sFaq7lG6HvzwDfISfObJSQyML'
            },
            userInfo: {
              id: 'user',
              url: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/coze-logo.png',
              nickname: '同学',
            },
            ui: {
              base: {
                icon: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/chatsdk-logo.png',
                layout: 'pc',
                lang: 'zh-CN',
                zIndex: 1000
              },
              header: {
                isShow: false, // 我们自己实现了头部，所以隐藏 SDK 自带的
                isNeedClose: false,
              },
              asstBtn: {
                isNeed: false // 隐藏右下角悬浮球，因为这是专用聊天页
              },
              footer: {
                isShow: true,
                expressionText: 'Powered by Coze & CAU',
              },
              chatBot: {
                title: '麦小吉 - CAU小助手',
                uploadable: true,
                width: '100%', // 宽度自适应容器
                el: containerRef.current, // 关键：将聊天框挂载到我们的 div 上
              },
            },
          });
          isInitialized.current = true;
        } catch (err) {
          console.error("Coze SDK Init Error:", err);
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup handled by ref check
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-stone-50">
      {/* 顶部导航条 */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center shadow-sm flex-shrink-0">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-stone-900">麦小吉 AI 助手</h1>
            <p className="text-xs text-green-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              在线 - 随时解答你的疑问
            </p>
          </div>
        </div>
      </div>

      {/* 聊天容器 */}
      <div className="flex-grow p-4 md:p-6 overflow-hidden flex justify-center">
        <div 
          id="coze-chat-container" 
          ref={containerRef}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 h-full"
        >
          {/* Coze SDK 将会被注入到这里 */}
          <div className="flex items-center justify-center h-full text-stone-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-4"></div>
              <p>正在连接麦小吉大脑...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};