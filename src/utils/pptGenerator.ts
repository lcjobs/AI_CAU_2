import PptxGenJS from 'pptxgenjs';

export const generateMaiXiaojiPPT = async () => {
  const pres = new PptxGenJS();

  // ------------------------------------------
  // 配置与样式常量
  // ------------------------------------------
  pres.author = '麦小吉 AI';
  pres.company = '中国农业大学';
  pres.subject = '新生入学与科研规划';
  pres.title = '麦小吉助手演示';

  const CAU_GREEN = '15803d'; // green-700
  const CAU_LIGHT_GREEN = 'dcfce7'; // green-100
  const CAU_YELLOW = 'ca8a04'; // yellow-600
  const CAU_LIGHT_YELLOW = 'fef9c3'; // yellow-100
  const TEXT_MAIN = '1c1917'; // stone-900
  const TEXT_SUB = '57534e'; // stone-600
  const BG_COLOR = 'F5F5F4'; // stone-100

  // ------------------------------------------
  // 1. 封面页
  // ------------------------------------------
  let slide = pres.addSlide();
  slide.background = { color: BG_COLOR };
  
  // 顶部装饰条
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: CAU_GREEN } });
  
  // LOGO 模拟 (圆形 + 文字)
  slide.addShape(pres.ShapeType.ellipse, { x: 1, y: 2, w: 1.5, h: 1.5, fill: { color: CAU_GREEN } });
  slide.addText('麦', { x: 1, y: 2, w: 1.5, h: 1.5, align: 'center', fontSize: 40, color: 'FFFFFF', bold: true });

  slide.addText('麦小吉 (Mai Xiaoji)', {
    x: 2.8, y: 2.2, w: '70%', fontSize: 48, bold: true, color: CAU_GREEN, fontFace: '微软雅黑'
  });
  slide.addText('中国农业大学新生专属 AI 智能体', {
    x: 2.8, y: 3.2, w: '70%', fontSize: 24, color: TEXT_MAIN, fontFace: '微软雅黑'
  });
  
  slide.addShape(pres.ShapeType.line, { x: 2.8, y: 3.8, w: 6, h: 0, line: { color: CAU_YELLOW, width: 3 } });

  slide.addText('汇报内容：功能详解 | 使用教程 | 场景演示', {
    x: 2.8, y: 4.2, w: '70%', fontSize: 18, color: TEXT_SUB
  });

  slide.addText('2025 新生特别版', {
    x: 8, y: 6.5, w: 4, fontSize: 14, color: TEXT_SUB, align: 'right'
  });

  // ------------------------------------------
  // 2. 产品简介
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('什么是“麦小吉”？', { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: CAU_GREEN });
  slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: CAU_GREEN, width: 1 } });

  // 左侧文字
  slide.addText([
    { text: '定位：', options: { bold: true, color: CAU_GREEN } },
    { text: '基于 Coze 平台与 React 框架开发的垂直领域 AI 助手。' },
    { text: '', options: { breakLine: true } },
    { text: '受众：', options: { bold: true, color: CAU_GREEN } },
    { text: '中国农业大学 本科新生 & 研究生新生。' },
    { text: '', options: { breakLine: true } },
    { text: '核心价值：', options: { bold: true, color: CAU_GREEN } },
    { text: '打破信息差，将复杂的教务政策、选课经验、科研文献检索转化为简单的“对话式”服务。' }
  ], { x: 0.5, y: 1.5, w: 5, fontSize: 16, lineSpacing: 30, color: TEXT_MAIN });

  // 右侧模拟手机界面
  slide.addShape(pres.ShapeType.roundRect, { x: 6, y: 1.5, w: 3, h: 5, fill: { color: 'FFFFFF' }, line: { color: '333333', width: 2 }, rectRadius: 0.1 });
  slide.addShape(pres.ShapeType.roundRect, { x: 6.2, y: 1.7, w: 2.6, h: 0.4, fill: { color: CAU_GREEN }, rectRadius: 0.5 }); // 手机顶栏
  // 气泡
  slide.addShape(pres.ShapeType.roundRect, { x: 6.2, y: 2.5, w: 2, h: 0.6, fill: { color: 'F3F4F6' }, rectRadius: 0.5 });
  slide.addText('你好，我是麦小吉！', { x: 6.2, y: 2.5, w: 2, h: 0.6, fontSize: 10, align: 'center' });
  
  slide.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 3.3, w: 2, h: 0.8, fill: { color: CAU_LIGHT_GREEN }, rectRadius: 0.5 });
  slide.addText('请问怎么算综测？', { x: 6.8, y: 3.3, w: 2, h: 0.8, fontSize: 10, align: 'center' });

  // ------------------------------------------
  // 3. 使用教程：三步走
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('如何使用：简单三步', { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: TEXT_MAIN });
  slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: CAU_GREEN, width: 1 } });

  // 步骤 1
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 2, w: 2.5, h: 3, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' }, shadow: { type: 'outer', color: '000000', opacity: 0.1 } });
  slide.addShape(pres.ShapeType.ellipse, { x: 1.5, y: 2.5, w: 0.5, h: 0.5, fill: { color: CAU_GREEN } });
  slide.addText('1', { x: 1.5, y: 2.5, w: 0.5, h: 0.5, align: 'center', color: 'FFFFFF', bold: true });
  slide.addText('选择身份', { x: 0.5, y: 3.2, w: 2.5, align: 'center', bold: true, fontSize: 16 });
  slide.addText('在网页首页点击\n“本科生”或“研究生”\n专属通道按钮。', { x: 0.6, y: 3.8, w: 2.3, align: 'center', fontSize: 12, color: TEXT_SUB });

  // 箭头
  slide.addShape(pres.ShapeType.rightArrow, { x: 3.2, y: 3.3, w: 0.6, h: 0.4, fill: { color: 'D1D5DB' } });

  // 步骤 2
  slide.addShape(pres.ShapeType.rect, { x: 4.0, y: 2, w: 2.5, h: 3, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' }, shadow: { type: 'outer', color: '000000', opacity: 0.1 } });
  slide.addShape(pres.ShapeType.ellipse, { x: 5.0, y: 2.5, w: 0.5, h: 0.5, fill: { color: CAU_GREEN } });
  slide.addText('2', { x: 5.0, y: 2.5, w: 0.5, h: 0.5, align: 'center', color: 'FFFFFF', bold: true });
  slide.addText('唤起智能体', { x: 4.0, y: 3.2, w: 2.5, align: 'center', bold: true, fontSize: 16 });
  slide.addText('点击“立即咨询”\n系统将自动跳转至\nCoze 智能对话界面。', { x: 4.1, y: 3.8, w: 2.3, align: 'center', fontSize: 12, color: TEXT_SUB });

  // 箭头
  slide.addShape(pres.ShapeType.rightArrow, { x: 6.7, y: 3.3, w: 0.6, h: 0.4, fill: { color: 'D1D5DB' } });

  // 步骤 3
  slide.addShape(pres.ShapeType.rect, { x: 7.5, y: 2, w: 2.5, h: 3, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' }, shadow: { type: 'outer', color: '000000', opacity: 0.1 } });
  slide.addShape(pres.ShapeType.ellipse, { x: 8.5, y: 2.5, w: 0.5, h: 0.5, fill: { color: CAU_GREEN } });
  slide.addText('3', { x: 8.5, y: 2.5, w: 0.5, h: 0.5, align: 'center', color: 'FFFFFF', bold: true });
  slide.addText('开始对话', { x: 7.5, y: 3.2, w: 2.5, align: 'center', bold: true, fontSize: 16 });
  slide.addText('输入你的问题，\n如“推荐通识课”\nAI 将即时回答。', { x: 7.6, y: 3.8, w: 2.3, align: 'center', fontSize: 12, color: TEXT_SUB });

  // ------------------------------------------
  // 4. 本科生功能详解 (1/2)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('本科生专属：学业护航', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_GREEN });
  
  // 模拟对话框 1：保研政策
  slide.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.5, w: 9, h: 2, fill: { color: CAU_LIGHT_GREEN } });
  slide.addText('Q: 今年的综测加分项有哪些？我参加了大创项目能加分吗？', { x: 0.7, y: 1.7, fontSize: 14, bold: true, color: CAU_GREEN });
  slide.addText('A: 根据《中国农业大学本科生奖学金评选办法》，大创项目属于“创新创业”板块...', { x: 0.7, y: 2.2, w: 8.5, fontSize: 12, color: TEXT_SUB });

  // 模拟对话框 2：选课
  slide.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 4, w: 9, h: 2, fill: { color: 'FFFFFF' }, line: { color: CAU_GREEN } });
  slide.addText('Q: 推荐几门给分高、老师有趣的通识核心课？', { x: 0.7, y: 4.2, fontSize: 14, bold: true, color: CAU_GREEN });
  slide.addText('A: 推荐《中国农业文明史》（李老师）：风趣幽默，无期中考；《插花艺术》：动手实践多...', { x: 0.7, y: 4.7, w: 8.5, fontSize: 12, color: TEXT_SUB });

  // ------------------------------------------
  // 5. 本科生功能详解 (2/2)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('本科生专属：生活与规划', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_GREEN });

  // 列表
  slide.addText('1. 奖学金评比助手', { x: 1, y: 1.5, fontSize: 18, bold: true, color: TEXT_MAIN });
  slide.addText('   收录国奖、校长奖学金、企业奖学金的评选硬性指标，提前自查差距。', { x: 1, y: 2, fontSize: 14, color: TEXT_SUB });

  slide.addText('2. 新生日程规划', { x: 1, y: 3, fontSize: 18, bold: true, color: TEXT_MAIN });
  slide.addText('   - 9月：社团招新、英语分级考试\n   - 11月：期中考试周\n   - 12月：四六级考试、期末备考', { x: 1, y: 3.5, fontSize: 14, color: TEXT_SUB });

  slide.addText('3. 历年真题库索引', { x: 1, y: 4.8, fontSize: 18, bold: true, color: TEXT_MAIN });
  slide.addText('   提供高数、大物、C语言等挂科率较高科目的复习重点与往年题型分析。', { x: 1, y: 5.3, fontSize: 14, color: TEXT_SUB });

  // ------------------------------------------
  // 6. 研究生功能详解 (1/2)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('研究生专属：科研加速器', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_YELLOW });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.2, h: '100%', fill: { color: CAU_YELLOW } }); // 左侧装饰条

  // 场景：文献综述
  slide.addShape(pres.ShapeType.roundRect, { x: 1, y: 1.5, w: 4, h: 4, fill: { color: CAU_LIGHT_YELLOW }, rectRadius: 0.1 });
  slide.addShape(pres.ShapeType.ellipse, { x: 2.5, y: 2, w: 1, h: 1, fill: { color: CAU_YELLOW } });
  slide.addText('文献综述生成', { x: 1, y: 3.2, w: 4, align: 'center', bold: true, fontSize: 18, color: CAU_YELLOW });
  slide.addText('输入关键词：\n“玉米抗旱基因挖掘”\n\nAI 输出：\n1. 研究背景\n2. 国内外现状\n3. 主要技术路线\n4. 参考文献列表', { x: 1.2, y: 3.8, w: 3.6, fontSize: 12, color: TEXT_MAIN });

  // 场景：专利查找
  slide.addShape(pres.ShapeType.roundRect, { x: 5.5, y: 1.5, w: 4, h: 4, fill: { color: 'FFFFFF' }, line: { color: CAU_YELLOW }, rectRadius: 0.1 });
  slide.addText('专利与查新', { x: 5.5, y: 2, w: 4, align: 'center', bold: true, fontSize: 18, color: CAU_YELLOW });
  slide.addText('快速扫描领域内的核心专利，分析技术创新点，辅助撰写开题报告中的“创新性分析”章节。', { x: 5.7, y: 3, w: 3.6, fontSize: 14, color: TEXT_MAIN });

  // ------------------------------------------
  // 7. 研究生功能详解 (2/2)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('研究生专属：学术产出辅助', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: CAU_YELLOW });

  // PPT 生成演示图
  slide.addText('开题/答辩 PPT 大纲生成', { x: 1, y: 1.5, fontSize: 18, bold: true, color: TEXT_MAIN });
  
  // 绘制一个模拟的 PPT 界面
  slide.addShape(pres.ShapeType.rect, { x: 1, y: 2, w: 6, h: 3.5, fill: { color: 'EEEEEE' }, line: { color: '999999' } });
  slide.addShape(pres.ShapeType.rect, { x: 1.5, y: 2.5, w: 5, h: 2.5, fill: { color: 'FFFFFF' } }); // Slide content
  slide.addText('AI 自动生成的 PPT 结构：', { x: 1.5, y: 2.6, fontSize: 10, color: '999999' });
  slide.addText('1. 研究意义 (Why)\n2. 研究内容 (What)\n3. 技术路线 (How)\n4. 预期成果 (Result)', { x: 2, y: 3, fontSize: 14, bold: true });
  
  slide.addText('麦小吉不仅提供文字内容，还能建议每一页 PPT 应该放什么图表（如：此处建议放技术路线流程图）。', { x: 1, y: 5.8, w: 8, fontSize: 14, color: TEXT_SUB });

  // ------------------------------------------
  // 8. 常见问题 (Q&A)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('常见问题 (Q&A)', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: TEXT_MAIN });

  const qas = [
    { q: 'Q: 麦小吉的数据准确吗？', a: 'A: 数据来源于学校官网公开文件及经过筛选的学术数据库，但建议涉及重大决策时查阅教务处原始文件。' },
    { q: 'Q: 需要付费吗？', a: 'A: 目前对中国农业大学在校生完全免费开放。' },
    { q: 'Q: 手机上能用吗？', a: 'A: 完美支持。网页采用响应式设计，在手机浏览器或微信中均可流畅使用。' }
  ];

  let startY = 1.5;
  qas.forEach(qa => {
    slide.addText(qa.q, { x: 1, y: startY, w: 8, fontSize: 16, bold: true, color: CAU_GREEN });
    slide.addText(qa.a, { x: 1, y: startY + 0.5, w: 8, fontSize: 14, color: TEXT_SUB });
    startY += 1.5;
  });

  // ------------------------------------------
  // 9. 技术架构 (简单介绍)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('技术架构', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: TEXT_MAIN });

  // 架构图
  slide.addShape(pres.ShapeType.roundRect, { x: 1, y: 2, w: 2, h: 1.5, fill: { color: '61DAFB' }, rectRadius: 0.2 });
  slide.addText('React 前端\n(交互界面)', { x: 1, y: 2, w: 2, h: 1.5, align: 'center', color: 'FFFFFF', bold: true });

  slide.addShape(pres.ShapeType.rightArrow, { x: 3.2, y: 2.5, w: 1, h: 0.5, fill: { color: 'DDDDDD' } });

  slide.addShape(pres.ShapeType.roundRect, { x: 4.4, y: 2, w: 2, h: 1.5, fill: { color: '7C3AED' }, rectRadius: 0.2 });
  slide.addText('Coze 智能体\n(大脑逻辑)', { x: 4.4, y: 2, w: 2, h: 1.5, align: 'center', color: 'FFFFFF', bold: true });

  slide.addShape(pres.ShapeType.rightArrow, { x: 6.6, y: 2.5, w: 1, h: 0.5, fill: { color: 'DDDDDD' } });

  slide.addShape(pres.ShapeType.roundRect, { x: 7.8, y: 2, w: 2, h: 1.5, fill: { color: '000000' }, rectRadius: 0.2 });
  slide.addText('Vercel\n(全球加速)', { x: 7.8, y: 2, w: 2, h: 1.5, align: 'center', color: 'FFFFFF', bold: true });

  slide.addText('安全说明：所有对话数据经过加密传输，严格保护学生隐私。', { x: 1, y: 5, fontSize: 12, color: '999999', italic: true });

  // ------------------------------------------
  // 10. 结束页
  // ------------------------------------------
  slide = pres.addSlide();
  slide.background = { color: CAU_GREEN };

  slide.addText('感谢使用', {
    x: 0, y: 2.5, w: '100%', align: 'center', fontSize: 60, bold: true, color: 'FFFFFF'
  });
  
  slide.addText('麦小吉 - 做最懂农大人的 AI 助手', {
    x: 0, y: 4, w: '100%', align: 'center', fontSize: 24, color: CAU_LIGHT_GREEN
  });

  slide.addText('© 2025 China Agricultural University AI Team', {
    x: 0, y: 6.5, w: '100%', align: 'center', fontSize: 14, color: 'FFFFFF'
  });

  // ------------------------------------------
  // 保存
  // ------------------------------------------
  await pres.writeFile({ fileName: '麦小吉_AI助手_完整介绍.pptx' });
};