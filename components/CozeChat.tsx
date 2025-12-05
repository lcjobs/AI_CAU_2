import React, { useEffect, useRef } from 'react';

// Define the window interface to include the Coze SDK
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
        // Initialize the Coze Web Chat Client
        // IMPORTANT: Replace 'YOUR_PAT_TOKEN_HERE' with your actual Personal Access Token
        // You can get this from the Coze Platform under API Keys.
        
        new window.CozeWebSDK.WebChatClient({
          config: {
            // Updated Bot ID provided by the user
            bot_id: '7578514424156356608', 
          },
          componentProps: {
            title: '麦小吉 - CAU小助手',
            width: 400, // Optional: customize width
          },
          auth: {
            type: 'token',
            // TODO: 请务必在这里填入您 Coze 平台的真实 PAT (Personal Access Token)
            // 否则聊天窗口会显示鉴权失败
            token: 'pat_YOUR_REAL_TOKEN_HERE', 
            onRefreshToken: function () {
              return 'pat_YOUR_REAL_TOKEN_HERE';
            }
          },
          ui: {
             // Optional UI customization
             chatButton: {
                style: {
                    backgroundColor: '#15803d', // Green-700
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

    return () => {
       // Cleanup if necessary
    };
  }, []);

  return null;
};