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
    if (typeof window === 'undefined') return;

    try {
      const scriptUrl = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js";
      
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      
      script.onload = () => {
        if (window.CozeWebSDK) {
          try {
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
                token: 'cztei_ljcihtX7X7OqyO8svFCeAc0pmlZuHN8aBmUy66P1sFaq7lG6HvzwDfISfObJSQyML',
                onRefreshToken: function () {
                  return 'cztei_ljcihtX7X7OqyO8svFCeAc0pmlZuHN8aBmUy66P1sFaq7lG6HvzwDfISfObJSQyML';
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
          } catch (err) {
            console.error("Coze SDK Initialization Error:", err);
          }
        }
      };

      script.onerror = () => {
        console.warn("Failed to load Coze SDK - This is expected if network is restricted.");
      };

      document.body.appendChild(script);
    } catch (e) {
      console.error("Error setting up Coze script:", e);
    }

    return () => {};
  }, []);

  return null;
};