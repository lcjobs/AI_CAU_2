import React from 'react';
import { MessageCircle, GraduationCap, BookOpen } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">欢迎来到中国农业大学</span>{' '}
                <span className="block text-green-700 xl:inline">你的AI智能伙伴</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                我是“麦小吉”，专门为CAU新生研发的智能助手。无论你是由于选课困扰的本科萌新，还是深陷文献海洋的研究生，我都能为你提供精准的帮助。
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onStartChat}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    立即咨询麦小吉
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg transition-all"
                  >
                    了解功能
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-stone-100 flex items-center justify-center overflow-hidden">
        {/* Abstract representation of Campus/Agriculture */}
        <div className="grid grid-cols-2 gap-4 p-8 opacity-80 transform rotate-3">
            <div className="bg-green-200 h-64 w-48 rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg">
                <GraduationCap size={64} className="text-green-800 mb-4"/>
                <span className="font-bold text-green-900 text-lg">学业规划</span>
            </div>
            <div className="bg-yellow-100 h-64 w-48 rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg mt-12">
                <BookOpen size={64} className="text-yellow-700 mb-4"/>
                <span className="font-bold text-yellow-800 text-lg">文献综述</span>
            </div>
        </div>
      </div>
    </div>
  );
};