import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { CozeChat } from './components/CozeChat';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { UndergradPage } from './components/UndergradPage';
import { GradPage } from './components/GradPage';
import { AboutPage, GuidePage, PrivacyPage } from './components/InfoPages';

// Define available pages
type PageType = 'home' | 'undergrad' | 'grad' | 'about' | 'guide' | 'privacy';

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // 页面导航处理
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 切换页面时滚动到顶部
  };

  // 处理直接进入 Coze 的点击（来自 Hero 的按钮）
  const handleStartDirectChat = () => {
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  // 渲染当前页面内容
  const renderContent = () => {
    switch (currentPage) {
      case 'undergrad':
        return <UndergradPage />;
      case 'grad':
        return <GradPage />;
      case 'about':
        return <AboutPage />;
      case 'guide':
        return <GuidePage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'home':
      default:
        return (
          <>
            {/* 首页内容：Hero + Features */}
            <Hero 
              onStartUndergradChat={() => handleNavigate('undergrad')} 
              onStartGradChat={() => handleNavigate('grad')} 
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
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onNavigate={(page) => handleNavigate(page as PageType)}
        currentPage={currentPage}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={(page) => handleNavigate(page as PageType)} />
      
      {/* 校园网登录弹窗 (全局可用) */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      {/* 右下角悬浮球 (全局可用) */}
      <CozeChat />
    </div>
  );
};

export default App;
