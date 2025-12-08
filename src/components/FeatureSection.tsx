import React, { useState } from 'react';
import { BookOpen, Calendar, Award, Search, MonitorPlay, Users, Compass, Download, Loader2 } from 'lucide-react';
// 动态导入以避免服务端渲染问题，虽然这里是SPA，但保持良好的习惯
import { generateMaiXiaojiPPT } from '../utils/pptGenerator';

interface FeatureSectionProps {
  title: string;
  description: string;
  type: 'undergrad' | 'grad';
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, type }) => {
  const isUndergrad = type === 'undergrad';
  const [isGenerating, setIsGenerating] = useState(false);

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

  const features = isUndergrad
    ? [
        {
          name: '保研政策与升学规划',
          description: '深度解析学校保研政策，为你量身定制升学路径。',
          icon: Compass,
        },
        {
          name: '选课智能推荐',
          description: '不知道选谁的课？麦小吉帮你分析老师风格与课程评价。',
          icon: BookOpen,
        },
        {
          name: '奖学金评比助手',
          description: '提供各类奖学金评选标准与申请攻略，助你榜上有名。',
          icon: Award,
        },
        {
          name: '日程与真题库',
          description: '本科新生日程规划建议，以及历年考试真题资源分享。',
          icon: Calendar,
        },
      ]
    : [
        {
          name: '文献搜寻与综述',
          description: '根据你的专业方向（如农业机械化），快速生成文献综述框架。',
          icon: Search,
        },
        {
          name: '领域快速入门',
          description: '帮助你快速熟悉陌生领域的论文和专利，缩短探索期。',
          icon: BookOpen,
        },
        {
          name: 'PPT 制作辅助',
          description: '生成开题答辩、小组汇报的PPT大纲与内容建议。',
          icon: MonitorPlay,
        },
        {
          name: '学术生涯规划',
          description: '针对研究生阶段的科研路径提供专业的未来规划建议。',
          icon: Users,
        },
      ];

  return (
    <div id={type} className="py-12 bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center relative">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">{type === 'undergrad' ? '本科生' : '研究生'}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {description}
          </p>
          
          {/* 研究生专属：一键生成PPT按钮 */}
          {!isUndergrad && (
            <div className="mt-6 flex justify-center">
              <button 
                onClick={handleGeneratePPT}
                disabled={isGenerating}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-yellow-900 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    正在生成演示文稿...
                  </>
                ) : (
                  <>
                    <Download className="-ml-1 mr-2 h-5 w-5" />
                    一键下载麦小吉介绍 PPT
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <dt>
                  <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${isUndergrad ? 'bg-green-500' : 'bg-yellow-500'} text-white group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
