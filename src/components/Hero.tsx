import React from 'react';
import { MessageCircle, GraduationCap, BookOpen, ChevronRight, Microscope, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartUndergradChat: () => void;
  onStartGradChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartUndergradChat, onStartGradChat }) => {
  return (
    <div className="relative bg-white overflow-hidden flex flex-col items-center">
      
      {/* Header Section */}
      <div className="pt-16 pb-12 text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium mb-4 border border-green-100">
          <Sparkles className="w-3 h-3 mr-1" />
          2025 新生专属版
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tight">
          麦小吉 <span className="text-green-700">AI 智能伙伴</span>
        </h1>
        <p className="mt-4 text-lg text-stone-500 max-w-2xl mx-auto">
          专为中国农业大学学子打造。请选择你的身份，开启定制化智能服务。
        </p>
      </div>

      {/* Split Interface Container */}
      <div className="w-full max-w-7xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Left Side: Undergrad */}
        <div className="relative group rounded-3xl overflow-hidden border border-stone-200 bg-gradient-to-br from-green-50 to-white hover:shadow-2xl transition-all duration-500 hover:border-green-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={120} className="text-green-800 transform rotate-12" />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
            <div className="flex-1">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 mb-6 shadow-sm">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-3">本科生通道</h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                从入学到毕业的全程陪伴。获取保研政策、选课避坑指南、奖学金攻略及校园生活建议。
              </p>
              <ul className="space-y-3 mb-8">
                {['智能选课推荐', '保研政策解读', '历年真题资源', '综测计算辅助'].map((item, i) => (
                  <li key={i} className="flex items-center text-stone-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={onStartUndergradChat}
              className="w-full py-4 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-700/20 hover:shadow-green-700/30 flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              进入本科生咨询
              <ChevronRight className="w-5 h-5 ml-1 opacity-70" />
            </button>
          </div>
        </div>

        {/* Right Side: Grad */}
        <div className="relative group rounded-3xl overflow-hidden border border-stone-200 bg-gradient-to-br from-yellow-50 to-white hover:shadow-2xl transition-all duration-500 hover:border-yellow-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Microscope size={120} className="text-yellow-800 transform -rotate-6" />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
            <div className="flex-1">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-700 mb-6 shadow-sm">
                <Microscope size={24} />
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-3">研究生通道</h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                你的科研加速器。提供文献综述撰写、领域快速入门、专利检索及开题答辩 PPT 辅助。
              </p>
              <ul className="space-y-3 mb-8">
                {['文献综述生成', '科研领域入门', '专利查新辅助', '学术生涯规划'].map((item, i) => (
                  <li key={i} className="flex items-center text-stone-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mr-3 text-yellow-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={onStartGradChat}
              className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/30 flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              进入科研辅助
              <ChevronRight className="w-5 h-5 ml-1 opacity-70" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};