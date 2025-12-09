import React from 'react';
import { MessageSquare, BrainCircuit, FileText, MonitorPlay, Search, Compass, ArrowDown } from 'lucide-react';

export const WorkflowDiagram: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-stone-100 my-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4 ring-4 ring-green-50">
             <BrainCircuit className="w-8 h-8 text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-stone-900">麦小吉 AI 智能体工作流</h3>
          <p className="text-stone-500 mt-2 max-w-2xl mx-auto">
            当您输入指令时，麦小吉的中央处理引擎会自动分析意图，提取关键词，并精准路由至四大核心功能模块。
          </p>
        </div>

        <div className="flex flex-col items-center">
          
          {/* STEP 1: USER INPUT */}
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-sm relative z-20">
                <div className="absolute -top-3 left-6 bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 rounded tracking-wider border border-stone-200">
                   USER INPUT / 用户输入
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-stone-100 rounded-full shrink-0">
                      <MessageSquare className="w-6 h-6 text-stone-600" />
                   </div>
                   <div>
                      <div className="text-stone-900 font-medium mb-1">自然语言指令示例</div>
                      <div className="bg-stone-50 p-3 rounded-lg text-stone-600 text-sm font-mono border border-stone-100 leading-relaxed">
                         "我想帮导师做一份关于<span className="text-green-700 font-bold bg-green-100 px-1 rounded mx-1">智慧农业</span>的<span className="text-green-700 font-bold bg-green-100 px-1 rounded mx-1">文献综述</span>，顺便生成个<span className="text-purple-700 font-bold bg-purple-100 px-1 rounded mx-1">PPT</span>汇报"
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* ARROW */}
          <div className="h-14 w-0.5 bg-stone-300 relative my-1">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full border border-stone-200 shadow-sm z-10">
                <ArrowDown className="w-5 h-5 text-stone-400" />
             </div>
          </div>

          {/* STEP 2: AI PROCESSING */}
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 z-20">
             <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-lg shadow-green-900/20 text-white relative overflow-hidden ring-4 ring-green-50">
                <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                   <BrainCircuit size={120} />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                   <h4 className="text-lg font-bold flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5" />
                      智能中枢 (AI Core)
                   </h4>
                   <p className="text-green-100 text-xs mt-1 mb-4 bg-green-800/30 px-3 py-0.5 rounded-full">LLM 意图识别 & 关键词提取</p>
                   
                   <div className="flex gap-2 flex-wrap justify-center">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs border border-white/30 shadow-sm">
                         <Search className="w-3 h-3" />
                         <span>提取: 文献综述</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs border border-white/30 shadow-sm">
                         <MonitorPlay className="w-3 h-3" />
                         <span>提取: PPT 生成</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs border border-white/30 shadow-sm">
                         <ArrowDown className="w-3 h-3" />
                         <span>路由: 并行任务</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* BRANCHING LINES (Responsive) */}
          <div className="w-full max-w-[95%] h-12 relative mt-2 mb-2 hidden md:block">
             {/* Center vertical down from AI Core */}
             <div className="absolute left-1/2 top-0 h-1/2 w-0.5 bg-stone-300 -translate-x-1/2"></div>
             {/* Horizontal Bar */}
             <div className="absolute left-[12.5%] right-[12.5%] top-1/2 h-0.5 bg-stone-300 rounded-full"></div>
             {/* Vertical Connectors to Cards */}
             <div className="absolute left-[12.5%] top-1/2 h-full w-0.5 bg-stone-300"></div>
             <div className="absolute left-[37.5%] top-1/2 h-full w-0.5 bg-stone-300"></div>
             <div className="absolute right-[37.5%] top-1/2 h-full w-0.5 bg-stone-300"></div>
             <div className="absolute right-[12.5%] top-1/2 h-full w-0.5 bg-stone-300"></div>
          </div>
          
          <div className="h-8 w-0.5 bg-stone-300 md:hidden"></div>

          {/* STEP 3: FUNCTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 z-20">
             
             {/* Card 1 */}
             <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors text-blue-600">
                   <FileText className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-stone-800 mb-1">1. 文献综述撰写</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                   自动检索知网/WOS，生成结构化综述大纲与摘要。
                </p>
             </div>

             {/* Card 2 */}
             <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors text-purple-600">
                   <MonitorPlay className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-stone-800 mb-1">2. 智能 PPT 生成</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                   一键转换长文本，生成带配图建议的演示文稿。
                </p>
             </div>

             {/* Card 3 */}
             <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-orange-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors text-orange-600">
                   <Search className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-stone-800 mb-1">3. 专利查新分析</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                   检索相似技术方案，快速输出查新点与创新分析。
                </p>
             </div>

             {/* Card 4 */}
             <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-green-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors text-green-600">
                   <Compass className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-stone-800 mb-1">4. 学术生涯规划</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                   基于大数据，定制硕博阶段的科研与升学路径。
                </p>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};