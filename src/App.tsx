import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { CozeChat } from './components/CozeChat';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // 修复说明：删除了未使用的 useState 和 isChatOpen 变量
  // 既然我们选择直接在新标签页打开，就不需要本地状态来控制显示了

  const handleStartChat = () => {
    // 直接在新标签页打开用户的 Coze 智能体链接
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
      <CozeChat />
    </div>
  );
};

export default App;