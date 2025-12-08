import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { CozeChat } from './components/CozeChat';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 处理本科生咨询点击
  const handleStartUndergradChat = () => {
    // 可以在这里添加针对本科生的特殊处理逻辑
    // 如果你有专门针对本科生的 Bot ID，可以在这里替换链接
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  // 处理研究生咨询点击
  const handleStartGradChat = () => {
    // 可以在这里添加针对研究生的特殊处理逻辑
    // 如果未来创建了独立的研究生 Bot，将下方的链接替换即可
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      {/* 传递登录点击事件 */}
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main className="flex-grow">
        {/* 传递两个不同的入口点击事件 */}
        <Hero 
          onStartUndergradChat={handleStartUndergradChat} 
          onStartGradChat={handleStartGradChat} 
        />
        
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
      
      {/* 校园网登录弹窗 */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      <CozeChat />
    </div>
  );
};

export default App;