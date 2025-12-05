import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    CozeWebSDK: any;
  }
}

export const CozeChat: React.FC = () => {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    const scriptUrl = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js";
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
      if (window.CozeWebSDK) {
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7578514424156356608', 
          },
          componentProps: {
            title: '麦小吉 - CAU小助手',
            width: 400,
          },
          auth: {
            type: 'token',
            // 注意：请务必替换为您的真实 PAT
            token: 'pat_********', 
            onRefreshToken: function () {
              return 'pat_********';
            }
          },
          ui: {
             chatButton: {
                style: {
                    backgroundColor: '#15803d',
                }
             }
          }
        });
        isLoaded.current = true;
      }
    };

    script.onerror = () => {
      console.error("Failed to load Coze SDK");
    };

    document.body.appendChild(script);

    return () => {};
  }, []);

  return null;
};