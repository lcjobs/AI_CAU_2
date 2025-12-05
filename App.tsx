import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { CozeChat } from './components/CozeChat';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // We use this state to trigger the chat window to open if the user clicks a "Start Chatting" button on the UI
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartChat = () => {
    setIsChatOpen(true);
    // 方案 A: 尝试引导用户看右下角 (已废弃)
    // alert("请点击右下角的麦小吉图标开始对话！");

    // 方案 B: 直接在新标签页打开用户的 Coze 智能体链接
    // 这提供了最直接的“进入对话页面”的体验
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero onStartChat={handleStartChat} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          <FeatureSection 
            title="本科新生专属服务" 
            description="从入学到毕业，麦小吉全程陪伴你的农大生活。"
            type="undergrad"
          />
          
          <FeatureSection 
            title="研究生科研助手" 
            description="文献综述、专利查找、开题答辩，科研路上的得力助手。"
            type="grad"
          />
        </div>
      </main>

      <Footer />
      
      {/* The Coze Chat SDK integration (右下角悬浮球) */}
      <CozeChat />
    </div>
  );
};

export default App;