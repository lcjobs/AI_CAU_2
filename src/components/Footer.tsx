import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">© 2024 麦小吉 (Mai Xiaoji) - 中国农业大学 AI 助手</p>
          <p className="text-xs mt-1 text-stone-600">Powered by Coze & React</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">关于我们</a>
          <a href="#" className="hover:text-white transition-colors">使用指南</a>
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
        </div>
      </div>
    </footer>
  );
};