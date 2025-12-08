import React from 'react';
import { Sprout } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (page: 'home' | 'undergrad' | 'grad' | 'about' | 'guide' | 'privacy') => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate, currentPage }) => {
  const getLinkClass = (page: string) => {
    const isActive = currentPage === page;
    return isActive
      ? "border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors";
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex-shrink-0 flex items-center text-green-700 hover:text-green-800 transition-colors">
              <Sprout className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl tracking-tight">麦小吉 | CAU</span>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <button 
              onClick={() => onNavigate('home')} 
              className={getLinkClass('home')}
            >
              首页
            </button>
            <button 
              onClick={() => onNavigate('undergrad')} 
              className={getLinkClass('undergrad')}
            >
              本科生
            </button>
            <button 
              onClick={() => onNavigate('grad')} 
              className={getLinkClass('grad')}
            >
              研究生
            </button>
          </div>
          <div className="flex items-center">
            <button 
              onClick={onLoginClick}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              登录校园网
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu (Simplified) */}
      <div className="md:hidden flex justify-around py-2 bg-stone-50 border-t border-stone-200 text-xs">
          <button onClick={() => onNavigate('home')} className={currentPage === 'home' ? 'text-green-700 font-bold' : 'text-stone-500'}>首页</button>
          <button onClick={() => onNavigate('undergrad')} className={currentPage === 'undergrad' ? 'text-green-700 font-bold' : 'text-stone-500'}>本科生</button>
          <button onClick={() => onNavigate('grad')} className={currentPage === 'grad' ? 'text-green-700 font-bold' : 'text-stone-500'}>研究生</button>
      </div>
    </header>
  );
};
