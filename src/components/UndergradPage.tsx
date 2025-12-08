import React, { useState } from 'react';
import { MessageCircle, GraduationCap, BookOpen, Award, Calendar, Compass, Download, Loader2 } from 'lucide-react';
import { generateMaiXiaojiPPT } from '../utils/pptGenerator';

export const UndergradPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartChat = () => {
    window.open('https://www.coze.cn/store/agent/7578514424156356608?bot_id=true', '_blank');
  };

  const handleGeneratePPT = async () => {
    try {
      setIsGenerating(true);
      // 调用生成器并传入 'undergrad' 参数
      await generateMaiXiaojiPPT('undergrad');
    } catch (error) {
      console.error("PPT生成失败", error);
      alert("PPT生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const features = [
    {
      icon: Compass,
      title: '保研政策导航',
      desc: '不仅是文件原文，麦小吉能帮你解读《学籍管理规定》，计算综测加分项，规划保研路径。'
    },
    {
      icon: BookOpen,
      title: '智能选课参谋',
      desc: '告别“盲选”。根据往届评价推荐通识课，分析老师授课风格，帮你避开“杀手课”。'
    },
    {
      icon: Award,
      title: '奖学金小助手',
      desc: '国奖、校长奖学金、企业奖学金……麦小吉帮你梳理评选条件，不再错过申请截止日期。'
    },
    {
      icon: Calendar,
      title: '备考与生活',
      desc: '提供高数、大物等基础课的复习重点建议，以及四六级、期末周的关键时间节点提醒。'
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-600 rounded-full mb-6">
            <GraduationCap size={48} className="text-green-100" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">本科生专属通道</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            从大一萌新到大四毕业，麦小吉全程陪伴你的农大生活。
            <br/>不仅懂学习，更懂你的校园生活。
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStartChat}
              className="bg-white text-green-800 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-green-50 transition-all flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              立即咨询麦小吉
            </button>
            <button
              onClick={handleGeneratePPT}
              disabled={isGenerating}
              className="bg-green-800 bg-opacity-30 border border-green-400 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-50 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  正在生成...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  下载本科介绍 PPT
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">我们可以为你做什么？</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-xl mr-4">
                <feature.icon className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 border-l-4 border-green-600 pl-4">热门提问示例</h2>
          <div className="grid md:grid-cols-2 gap-4">
             {['如果你是食品学院的大一新生，可以问：', '如果你想准备保研，可以问：'].map((label, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-stone-200">
                  <p className="text-sm text-stone-500 mb-2">{label}</p>
                  <p className="text-green-700 font-medium text-lg">
                    {i === 0 ? "“大一上学期建议选哪些通识核心课？”" : "“综测加分里的‘社会服务’包括哪些活动？”"}
                  </p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};