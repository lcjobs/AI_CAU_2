import PptxGenJS from 'pptxgenjs';

export type UserType = 'undergrad' | 'grad' | 'all';

export const generateMaiXiaojiPPT = async (userType: UserType = 'all') => {
  const pres = new PptxGenJS();

  // ------------------------------------------
  // 配置与样式常量
  // ------------------------------------------
  pres.author = '麦小吉 AI';
  pres.company = '中国农业大学';
  pres.subject = userType === 'undergrad' ? '本科新生入学指南' : (userType === 'grad' ? '研究生科研规划指南' : '麦小吉功能全解');
  pres.title = '麦小吉演示文稿';

  const CAU_GREEN = '15803d'; // green-700
  const CAU_LIGHT_GREEN = 'dcfce7'; // green-100
  const CAU_YELLOW = 'ca8a04'; // yellow-600
  const CAU_LIGHT_YELLOW = 'fef9c3'; // yellow-100
  const TEXT_MAIN = '1c1917'; // stone-900
  const TEXT_SUB = '57534e'; // stone-600
  const BG_COLOR = 'F5F5F4'; // stone-100

  // 辅助函数：根据身份选择主色调
  const getMainColor = () => userType === 'grad' ? CAU_YELLOW : CAU_GREEN;
  const THEME_COLOR = getMainColor();

  // ------------------------------------------
  // 1. 封面页
  // ------------------------------------------
  let slide = pres.addSlide();
  slide.background = { color: BG_COLOR };
  
  // 顶部装饰条
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: THEME_COLOR } });
  
  // LOGO 模拟
  slide.addShape(pres.ShapeType.ellipse, { x: 1, y: 2, w: 1.5, h: 1.5, fill: { color: THEME_COLOR } });
  slide.addText('麦', { x: 1, y: 2, w: 1.5, h: 1.5, align: 'center', fontSize: 40, color: 'FFFFFF', bold: true });

  slide.addText('麦小吉 (Mai Xiaoji)', {
    x: 2.8, y: 2.2, w: '70%', fontSize: 48, bold: true, color: THEME_COLOR, fontFace: '微软雅黑'
  });
  
  let subTitle = '中国农业大学 AI 智能助手';
  if (userType === 'undergrad') subTitle += ' | 本科生专属版';
  if (userType === 'grad') subTitle += ' | 研究生科研版';

  slide.addText(subTitle, {
    x: 2.8, y: 3.2, w: '70%', fontSize: 24, color: TEXT_MAIN, fontFace: '微软雅黑'
  });
  
  slide.addShape(pres.ShapeType.line, { x: 2.8, y: 3.8, w: 6, h: 0, line: { color: TEXT_SUB, width: 3 } });

  slide.addText('汇报内容：功能详解 | 使用教程 | 场景演示', {
    x: 2.8, y: 4.2, w: '70%', fontSize: 18, color: TEXT_SUB
  });

  slide.addText('2025 新生特别版', {
    x: 8, y: 6.5, w: 4, fontSize: 14, color: TEXT_SUB, align: 'right'
  });

  // ------------------------------------------
  // 2. 产品简介 (通用)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('什么是“麦小吉”？', { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: THEME_COLOR });
  slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: THEME_COLOR, width: 1 } });

  slide.addText([
    { text: '定位：', options: { bold: true, color: THEME_COLOR } },
    { text: '基于 Coze 平台与 React 框架开发的垂直领域 AI 助手。' },
    { text: '', options: { breakLine: true } },
    { text: '受众：', options: { bold: true, color: THEME_COLOR } },
    { text: userType === 'undergrad' ? '中国农业大学 本科新生。' : (userType === 'grad' ? '中国农业大学 研究生新生。' : '中国农业大学全体新生。') },
    { text: '', options: { breakLine: true } },
    { text: '核心价值：', options: { bold: true, color: THEME_COLOR } },
    { text: '打破信息差，提供 7x24 小时的贴身指导。' }
  ], { x: 0.5, y: 1.5, w: 5, fontSize: 16, lineSpacing: 30, color: TEXT_MAIN });

  // 模拟界面
  slide.addShape(pres.ShapeType.roundRect, { x: 6, y: 1.5, w: 3, h: 5, fill: { color: 'FFFFFF' }, line: { color: '333333', width: 2 }, rectRadius: 0.1 });
  slide.addShape(pres.ShapeType.roundRect, { x: 6.2, y: 1.7, w: 2.6, h: 0.4, fill: { color: THEME_COLOR }, rectRadius: 0.5 });
  slide.addShape(pres.ShapeType.roundRect, { x: 6.2, y: 2.5, w: 2, h: 0.6, fill: { color: 'F3F4F6' }, rectRadius: 0.5 });
  slide.addText('你好，麦小吉！', { x: 6.2, y: 2.5, w: 2, h: 0.6, fontSize: 10, align: 'center' });

  // ------------------------------------------
  // 3. 详细功能模块 (根据身份定制)
  // ------------------------------------------
  
  // === 本科生专属内容 ===
  if (userType === 'undergrad' || userType === 'all') {
    // 页面 3.1: 学业规划
    slide = pres.addSlide();
    slide.addText('本科生专属：学业全景规划', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_GREEN });
    slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: CAU_GREEN, width: 1 } });
    
    // 时间轴
    const timelineY = 2.5;
    slide.addShape(pres.ShapeType.rightArrow, { x: 1, y: timelineY, w: 8, h: 0.8, fill: { color: CAU_LIGHT_GREEN } });
    
    slide.addText('大一：适应期', { x: 1.2, y: timelineY+0.1, fontSize: 14, bold: true, color: CAU_GREEN });
    slide.addText('- 英语分级考试\n- 通识选课规划\n- 加入1-2个社团', { x: 1.2, y: timelineY+1, fontSize: 12, color: TEXT_SUB });
    
    slide.addText('大二：探索期', { x: 3.5, y: timelineY+0.1, fontSize: 14, bold: true, color: CAU_GREEN });
    slide.addText('- 参加URP/大创\n- 辅修双学位\n- 英语四六级刷分', { x: 3.5, y: timelineY+1, fontSize: 12, color: TEXT_SUB });
    
    slide.addText('大三：冲刺期', { x: 5.8, y: timelineY+0.1, fontSize: 14, bold: true, color: CAU_GREEN });
    slide.addText('- 计算综测排名\n- 准备保研/考研\n- 核心专业课', { x: 5.8, y: timelineY+1, fontSize: 12, color: TEXT_SUB });
    
    slide.addText('大四：收获期', { x: 8.0, y: timelineY+0.1, fontSize: 14, bold: true, color: CAU_GREEN });
    slide.addText('- 毕业设计\n- 实习/秋招\n- 毕业旅行', { x: 8.0, y: timelineY+1, fontSize: 12, color: TEXT_SUB });

    // 页面 3.2: 综测与保研
    slide = pres.addSlide();
    slide.addText('本科生专属：综测与保研计算器', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_GREEN });
    slide.addText('告别复杂的 Excel 公式，麦小吉帮你算清楚每一分', { x: 0.5, y: 1.2, fontSize: 16, color: TEXT_SUB });
    
    slide.addShape(pres.ShapeType.roundRect, { x: 1, y: 2, w: 3.5, h: 4, fill: { color: 'F0FDF4' }, line: { color: CAU_GREEN }, rectRadius: 0.1 });
    slide.addText('学业成绩 (GPA)', { x: 1.2, y: 2.2, fontSize: 18, bold: true, color: CAU_GREEN });
    slide.addText('必修课 + 专选课\n权重占比最大\n麦小吉提示：\n“不要忽视体育课和思政课的绩点！”', { x: 1.2, y: 2.8, w: 3, fontSize: 14, color: TEXT_MAIN });

    slide.addShape(pres.ShapeType.roundRect, { x: 5.5, y: 2, w: 3.5, h: 4, fill: { color: 'FFF7ED' }, line: { color: CAU_YELLOW }, rectRadius: 0.1 });
    slide.addText('综合素质加分', { x: 5.7, y: 2.2, fontSize: 18, bold: true, color: CAU_YELLOW });
    slide.addText('1. 科技创新 (URP, 学科竞赛)\n2. 社会工作 (学生会, 班委)\n3. 文体活动\n4. 社会实践\n\n麦小吉可以直接回答：\n“我是院学生会部长能加多少分？”', { x: 5.7, y: 2.8, w: 3.2, fontSize: 14, color: TEXT_MAIN });
  }

  // === 研究生专属内容 ===
  if (userType === 'grad' || userType === 'all') {
    // 页面 4.1: 科研工作流
    slide = pres.addSlide();
    slide.addText('研究生专属：全流程科研辅助', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_YELLOW });
    slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: CAU_YELLOW, width: 1 } });

    // 流程图
    const boxes = [
      { t: '选题/开题', c: CAU_LIGHT_YELLOW },
      { t: '文献调研', c: CAU_LIGHT_YELLOW },
      { t: '实验/数据', c: 'FFFFFF' }, // 麦小吉暂时无法做实验
      { t: '论文撰写', c: CAU_LIGHT_YELLOW },
      { t: '答辩演示', c: CAU_LIGHT_YELLOW }
    ];

    boxes.forEach((b, i) => {
      slide.addShape(pres.ShapeType.roundRect, { x: 1 + i*1.7, y: 2.5, w: 1.4, h: 1.4, fill: { color: b.c }, line: { color: CAU_YELLOW }, rectRadius: 0.1 });
      slide.addText(b.t, { x: 1 + i*1.7, y: 2.9, w: 1.4, align: 'center', fontSize: 14, bold: true });
      if(i < 4) slide.addShape(pres.ShapeType.rightArrow, { x: 2.45 + i*1.7, y: 3.1, w: 0.2, h: 0.2, fill: { color: TEXT_SUB } });
    });

    slide.addText('麦小吉覆盖 80% 的案头工作场景', { x: 1, y: 4.5, w: 8, align: 'center', fontSize: 18, color: CAU_YELLOW, bold: true });

    // 页面 4.2: 核心功能
    slide = pres.addSlide();
    slide.addText('研究生专属：核心功能详解', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_YELLOW });
    
    // 专利
    slide.addShape(pres.ShapeType.rect, { x: 1, y: 1.5, w: 8, h: 1.8, fill: { color: 'FEF3C7' }, rectRadius: 0.2 });
    slide.addText('🔍 专利查新与创新点分析', { x: 1.2, y: 1.7, fontSize: 16, bold: true, color: '92400E' });
    slide.addText('输入技术关键词，AI 快速检索相似专利，并生成对比分析表格，辅助撰写开题报告。', { x: 1.2, y: 2.2, w: 7.6, fontSize: 14 });

    // 文献
    slide.addShape(pres.ShapeType.rect, { x: 1, y: 3.6, w: 8, h: 1.8, fill: { color: 'ECFCCB' }, rectRadius: 0.2 });
    slide.addText('📚 文献综述大纲生成', { x: 1.2, y: 3.8, fontSize: 16, bold: true, color: '365314' });
    slide.addText('面对海量文献不知从何下笔？麦小吉帮你梳理逻辑框架：背景->现状->问题->趋势。', { x: 1.2, y: 4.3, w: 7.6, fontSize: 14 });
  }

  // ------------------------------------------
  // 5. 常见问题 (Q&A) - 通用
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('常见问题 (Q&A)', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: TEXT_MAIN });

  const qas = [
    { q: 'Q: 麦小吉的数据来源是哪里？', a: 'A: 数据来源于中国农业大学官网、教务处公开文件及经过筛选的学术知识库。' },
    { q: 'Q: 真的免费吗？', a: 'A: 是的，本项目由校友开发，对全体农大在校生免费开放。' },
    { q: 'Q: 遇到回答不准确怎么办？', a: 'A: AI 可能会有幻觉，涉及学分、毕业要求等重大事项，请务必以教务处最新红头文件为准。' }
  ];

  let startY = 1.5;
  qas.forEach(qa => {
    slide.addText(qa.q, { x: 1, y: startY, w: 8, fontSize: 16, bold: true, color: THEME_COLOR });
    slide.addText(qa.a, { x: 1, y: startY + 0.5, w: 8, fontSize: 14, color: TEXT_SUB });
    startY += 1.5;
  });

  // ------------------------------------------
  // 6. 结束页
  // ------------------------------------------
  slide = pres.addSlide();
  slide.background = { color: THEME_COLOR };

  slide.addText('感谢使用', {
    x: 0, y: 2.5, w: '100%', align: 'center', fontSize: 60, bold: true, color: 'FFFFFF'
  });
  
  slide.addText('麦小吉 - 做最懂农大人的 AI 助手', {
    x: 0, y: 4, w: '100%', align: 'center', fontSize: 24, color: 'FFFFFF'
  });
  
  const fileName = userType === 'undergrad' ? '麦小吉_本科新生指南.pptx' : (userType === 'grad' ? '麦小吉_研究生科研指南.pptx' : '麦小吉_完整介绍.pptx');

  // ------------------------------------------
  // 保存
  // ------------------------------------------
  await pres.writeFile({ fileName: fileName });
};