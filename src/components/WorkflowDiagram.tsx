import React from 'react';
import { MessageSquare, BrainCircuit, FileText, MonitorPlay, Search, Compass, ArrowDown } from 'lucide-react';

export const WorkflowDiagram: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-sm border border-stone-200 my-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-stone-900">麦小吉 AI 工作流原理</h3>
        <p className="text-stone-500 text-sm mt-2">基于自然语言处理 (NLP) 的意图识别与分流机制</p>
      </div>

      <div className="flex flex-col items-center relative">
        
        {/* Level 1: User Input */}
        <div className="relative z-10 w-full max-w-md bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center shadow-sm">
          <div className="bg-stone-200 p-2 rounded-lg mr-4">
            <MessageSquare className="w-6 h-6 text-stone-600" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-stone-400 font-bold uppercase mb-1">用户输入 (User Input)</div>
            <div className="text-sm text-stone-800 font-mono bg-white p-2 rounded border border-stone-100">
              "我想帮导师查一下<span className="text-green-600 font-bold">专利</span>，顺便做个<span className="text-green-600 font-bold">PPT</span>汇报"
            </div>
          </div>
        </div>

        {/* Connector Arrow */}
        <div className="h-8 w-0.5 bg-stone-300 my-1 relative">
          <ArrowDown className="absolute -bottom-2 -left-2.5 w-6 h-6 text-stone-300" />
        </div>

        {/* Level 2: AI Processing (Keyword Extraction) */}
        <div className="relative z-10 w-full max-w-md bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
          <div className="flex items-center mb-2">
            <BrainCircuit className="w-6 h-6 text-green-700 mr-2" />
            <span className="font-bold text-green-900">核心处理引擎 (AI Agent Core)</span>
          </div>
          <div className="text-xs text-green-800 bg-green-100 px-3 py-1 rounded-full border border-green-200">
            自动提取关键词 & 意图路由
          </div>
        </div>

        {/* Level 3: Branching Connectors */}
        <div className="w-full max-w-4xl mt-6 mb-2 hidden md:block">
           {/* Horizontal Line */}
           <div className="h-0.5 bg-stone-300 w-3/4 mx-auto relative">
             {/* Vertical Connectors to Cards */}
             <div className="absolute left-0 top-0 h-6 w-0.5 bg-stone-300"></div>
             <div className="absolute left-1/3 top-0 h-6 w-0.5 bg-stone-300"></div>
             <div className="absolute right-1/3 top-0 h-6 w-0.5 bg-stone-300"></div>
             <div className="absolute right-0 top-0 h-6 w-0.5 bg-stone-300"></div>
             
             {/* Connection from Parent */}
             <div className="absolute left-1/2 top-[-24px] h-6 w-0.5 bg-stone-300 -ml-[1px]"></div>
           </div>
        </div>

        {/* Mobile vertical line */}
        <div className="h-8 w-0.5 bg-stone-300 md:hidden"></div>

        {/* Level 4: The 4 Functions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-5xl">
          
          {/* Function 1 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center text-center hover:border-green-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-blue-50 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm">文献综述撰写</h4>
            <div className="mt-2 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
              关键词: <span className="text-stone-700">综述, 现状, 研究进展</span>
            </div>
          </div>

          {/* Function 2 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center text-center hover:border-green-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-purple-50 rounded-full mb-3 group-hover:bg-purple-100 transition-colors">
              <MonitorPlay className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm">智能 PPT 生成</h4>
            <div className="mt-2 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
              关键词: <span className="text-stone-700">PPT, 汇报, 幻灯片</span>
            </div>
          </div>

          {/* Function 3 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center text-center hover:border-green-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-orange-50 rounded-full mb-3 group-hover:bg-orange-100 transition-colors">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm">专利查新和分析</h4>
            <div className="mt-2 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
              关键词: <span className="text-stone-700">专利, 查新, 创新点</span>
            </div>
          </div>

          {/* Function 4 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center text-center hover:border-green-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-green-50 rounded-full mb-3 group-hover:bg-green-100 transition-colors">
              <Compass className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm">学术生涯规划</h4>
            <div className="mt-2 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
              关键词: <span className="text-stone-700">保研, 读博, 就业</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
