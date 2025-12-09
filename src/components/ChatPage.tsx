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
    
    // 清理之前的 SDK 实例或容器内容
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // 使用您提供的新的 SDK 地址 (builder-web-sdk)
    const scriptUrl = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/builder-web-sdk/0.1.1-beta.1/dist/umd/index.js";
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
      if (window.CozeWebSDK && containerRef.current) {
        try {
          console.log("Initializing Coze AppWebSDK...");
          
          // 使用 AppWebSDK 初始化
          new window.CozeWebSDK.AppWebSDK({
            // 使用您提供的鉴权 Token (cztei_...)
            token: 'cztei_lmTlxZEx2TwnAH2PZnOQ0WCm6LvXcke0TOMl9LGiZJ5mNKyAMn2eU8jf5H1xKfk4G',
            
            // 注意：您提供的代码中 appId 为空。
            // 对于智能体 (Bot)，通常使用 botId。我填入了您之前的 Bot ID。
            // 如果这是一个 Coze App，请替换为 appId。
            botId: '7578514424156356608', 
            // appId: '', 
            
            // 将 SDK 挂载到当前的 React ref 节点上
            container: containerRef.current,
            
            userInfo: {
              id: 'user',
              url: 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/coze-logo.png',
              nickname: '同学',
            },
            ui: {
              className: 'h-full w-full', // 强制占满容器
            }
          });
          
          isInitialized.current = true;
        } catch (err) {
          console.error("Coze SDK Initialization Error:", err);
        }
      }
    };

    script.onerror = () => {
      console.warn("Failed to load Coze SDK");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup usually handled by removing the script or component unmounting
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-stone-50 overflow-hidden">
      {/* 顶部导航条 - 保持简易导航功能 */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center shadow-sm flex-shrink-0 z-50">
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
          </div>
        </div>
      </div>

      {/* 聊天主容器 */}
      {/* 设置 flex-grow 确保占满剩余高度 */}
      <div className="flex-grow w-full relative bg-white">
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
        >
          {/* SDK 会被渲染到这里 */}
          <div className="flex items-center justify-center h-full text-stone-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-4"></div>
              <p>正在加载对话界面...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};