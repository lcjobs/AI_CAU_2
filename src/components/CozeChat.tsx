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

    // Use specific SDK version from Coze CDN
    const scriptUrl = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js";
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    // Adding crossorigin can sometimes help with CDN issues, though not strictly required if server allows
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      if (window.CozeWebSDK) {
        try {
          // Initialize the Coze Web Chat Client
          new window.CozeWebSDK.WebChatClient({
            config: {
              bot_id: '7578514424156356608', 
            },
            componentProps: {
              title: '麦小吉 - CAU小助手',
              width: 400, // Optional: customize width
            },
            auth: {
              type: 'token',
              // Use the verified working token from ChatPage logic
              token: 'cztei_hIfYjhsBOVexNPahSXBY0zpZeNC3Owzm1wJnGVoZN3kb6GSAV40eQLVwfBzkLRV4z', 
              onRefreshToken: function () {
                return 'cztei_hIfYjhsBOVexNPahSXBY0zpZeNC3Owzm1wJnGVoZN3kb6GSAV40eQLVwfBzkLRV4z';
              }
            },
            ui: {
               chatButton: {
                  style: {
                      backgroundColor: '#15803d', // Green-700
                  }
               }
            }
          });
          isLoaded.current = true;
          console.log("Coze SDK initialized successfully");
        } catch (err) {
          console.error("Coze SDK initialization failed:", err);
        }
      }
    };

    script.onerror = (e) => {
      console.warn("Failed to load Coze SDK script. Chat widget may not appear.", e);
    };

    document.body.appendChild(script);

    return () => {
       // Optional cleanup if needed
    };
  }, []);

  return null;
};