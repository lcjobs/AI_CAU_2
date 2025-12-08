import React from 'react';

interface FooterProps {
  onNavigate: (page: 'about' | 'guide' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-sm">© 2025 麦小吉 (Mai Xiaoji) - 中国农业大学 AI 助手</p>
          <p className="text-xs mt-1 text-stone-600">Powered by Coze & React</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors focus:outline-none">关于我们</button>
          <button onClick={() => onNavigate('guide')} className="hover:text-white transition-colors focus:outline-none">使用指南</button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors focus:outline-none">隐私政策</button>
        </div>
      </div>
    </footer>
  );
};
