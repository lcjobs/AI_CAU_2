import React, { useState } from 'react';
import { MessageCircle, Microscope, Search, FileText, MonitorPlay, Users, Download, Loader2 } from 'lucide-react';
import { generateMaiXiaojiPPT } from '../utils/pptGenerator';

export const GradPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartChat = () => {
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  const handleGeneratePPT = async () => {
    try {
      setIsGenerating(true);
      await generateMaiXiaojiPPT();
    } catch (error) {
      console.error("PPT生成失败", error);
      alert("PPT生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const features = [
    {
      icon: Search,
      title: '文献综述辅助',
      desc: '输入你的研究方向（如：作物遗传育种、农业水利工程），麦小吉帮你生成综述的大纲结构和核心关键词，缩短阅读时间。'
    },
    {
      icon: FileText,
      title: '专利查新与分析',
      desc: '快速扫描领域内的核心专利，分析技术创新点，辅助撰写开题报告中的“创新性分析”章节。'
    },
    {
      icon: MonitorPlay,
      title: 'PPT 智能生成',
      desc: '最头疼的组会汇报 PPT？麦小吉能根据你的论文摘要，一键生成 PPT 的大纲内容和每一页的配图建议。'
    },
    {
      icon: Users,
      title: '学术生涯规划',
      desc: '针对硕士、博士不同阶段，提供发刊计划建议、时间管理技巧以及投稿期刊的分区查询辅助。'
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="bg-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-full mb-6">
            <Microscope size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">研究生科研加速器</h1>
          <p className="text-xl text-yellow-50 max-w-2xl mx-auto">
            专注于学术产出与科研效率。
            <br/>从文献阅读到论文答辩，做你最得力的科研助手。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStartChat}
              className="bg-white text-yellow-800 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-50 transition-all flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              立即咨询麦小吉
            </button>
            <button
              onClick={handleGeneratePPT}
              disabled={isGenerating}
              className="bg-yellow-800 bg-opacity-30 border border-yellow-400 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-50 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  正在生成...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  下载详细介绍 PPT
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center mb-12">
           <div className="h-1 w-20 bg-yellow-500 rounded mr-4"></div>
           <h2 className="text-3xl font-bold text-stone-900">科研场景全覆盖</h2>
           <div className="h-1 w-20 bg-yellow-500 rounded ml-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-yellow-200 hover:shadow-md transition-all flex items-start">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-xl mr-4">
                <feature.icon className="w-8 h-8 text-yellow-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
