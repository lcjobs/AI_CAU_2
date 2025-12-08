import React from 'react';
import { Shield, Book, Info } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
        <Info className="w-10 h-10 text-green-700" />
      </div>
      <h1 className="text-3xl font-bold text-stone-900">关于麦小吉</h1>
    </div>
    <div className="prose prose-stone mx-auto bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
      <p className="text-lg leading-relaxed mb-6">
        <strong>“麦小吉”</strong> 是一款专为中国农业大学（CAU）新生研发的生成式 AI 智能体。我们的名字取自“麦浪”与“吉祥”，寓意在农大的沃土上收获知识与希望。
      </p>
      <p className="mb-4">
        本项目由热爱技术的农大校友团队开发，旨在利用最前沿的大模型技术（LLM），打破信息壁垒，解决新生入学时的“迷茫”与研究生科研起步时的“焦虑”。
      </p>
      <p className="mb-4">
        我们的核心能力构建在 Coze 扣子平台之上，结合 React 现代化前端技术，为您提供流畅、智能、定制化的网页体验。
      </p>
      <h3 className="text-xl font-bold mt-8 mb-4 text-green-800">我们的愿景</h3>
      <p>做最懂农大人的 AI 伙伴，让每一位 CAUer 的求学之路不再孤单。</p>
    </div>
  </div>
);

export const GuidePage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
        <Book className="w-10 h-10 text-blue-700" />
      </div>
      <h1 className="text-3xl font-bold text-stone-900">使用指南</h1>
    </div>
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
        <h3 className="text-xl font-bold mb-2">第一步：选择身份通道</h3>
        <p className="text-stone-600">
          在首页顶部或中央区域，根据您的年级点击<strong>“本科生”</strong>或<strong>“研究生”</strong>。不同通道预置了不同的知识库，能提供更精准的回答。
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm">
        <h3 className="text-xl font-bold mb-2">第二步：开始对话</h3>
        <p className="text-stone-600">
          点击页面上的<strong>“立即咨询麦小吉”</strong>按钮。如果您是首次使用，系统可能会弹出一个新窗口，直接进入 Coze 智能体界面。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
        <h3 className="text-xl font-bold mb-2">第三步：高效提问技巧</h3>
        <p className="text-stone-600 mb-2">尝试这样问，效果更好：</p>
        <ul className="list-disc list-inside text-stone-600 space-y-1 bg-stone-50 p-4 rounded-lg">
          <li>“帮我列出大一上学期必做的时间规划表。”</li>
          <li>“我是车辆工程专业的硕士，帮我找5篇关于无人驾驶农机的核心文献。”</li>
          <li>“生成一份关于‘智慧农业’的开题答辩 PPT 大纲。”</li>
        </ul>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-stone-200 rounded-full mb-4">
        <Shield className="w-10 h-10 text-stone-700" />
      </div>
      <h1 className="text-3xl font-bold text-stone-900">隐私政策</h1>
    </div>
    <div className="bg-white p-8 rounded-2xl shadow-sm text-stone-600 space-y-6">
      <p>更新日期：2025年1月1日</p>
      <p>
        麦小吉团队非常重视您的隐私。在使用本服务前，请仔细阅读以下声明：
      </p>
      
      <h3 className="text-lg font-bold text-stone-900">1. 数据收集</h3>
      <p>
        我们<strong>不会</strong>收集您的个人身份信息（如真实姓名、学号、身份证号）。
        所有的对话数据均由 Coze 平台进行处理，对话历史仅存储在您的本地浏览器缓存或 Coze 账户中。
      </p>

      <h3 className="text-lg font-bold text-stone-900">2. 校园网模拟登录</h3>
      <p>
        网页中提供的“校园网登录”功能目前仅为<strong>界面演示（Mock UI）</strong>，用于展示设计理念。
        您输入的学号和密码<strong>不会</strong>被发送到任何服务器，也不会被记录。
      </p>

      <h3 className="text-lg font-bold text-stone-900">3. 第三方服务</h3>
      <p>
        本服务依赖字节跳动 Coze 平台提供的 AI 能力。在使用对话功能时，您需遵守 Coze 平台的用户协议与隐私政策。
      </p>

      <h3 className="text-lg font-bold text-stone-900">4. 联系我们</h3>
      <p>
        如果您对隐私保护有任何疑问，请通过网页底部的联系方式与开发团队取得联系。
      </p>
    </div>
  </div>
);
