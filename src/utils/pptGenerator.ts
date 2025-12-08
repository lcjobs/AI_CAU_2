import PptxGenJS from 'pptxgenjs';

export const generateMaiXiaojiPPT = async () => {
  const pres = new PptxGenJS();

  // 设置元数据
  pres.author = '麦小吉 AI';
  pres.company = '中国农业大学';
  pres.subject = '新生入学与科研规划';
  pres.title = '麦小吉助手演示';

  // 定义主题色
  const CAU_GREEN = '15803d'; // green-700
  const CAU_YELLOW = 'ca8a04'; // yellow-600
  const BG_COLOR = 'F5F5F4'; // stone-100

  // ------------------------------------------
  // 1. 封面页
  // ------------------------------------------
  let slide = pres.addSlide();
  slide.background = { color: BG_COLOR };
  
  // 装饰条
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.5, fill: { color: CAU_GREEN } });
  
  slide.addText('麦小吉 (Mai Xiaoji)', {
    x: 1, y: 2.5, w: '80%', fontSize: 44, bold: true, color: CAU_GREEN, fontFace: '微软雅黑'
  });
  slide.addText('基于 Coze 与 React 的中国农业大学新生一站式 AI 助手', {
    x: 1, y: 3.5, w: '80%', fontSize: 24, color: '57534e', fontFace: '微软雅黑'
  });
  slide.addText('汇报人：开发团队 | 2025年', {
    x: 1, y: 5.5, w: '80%', fontSize: 18, color: '78716c'
  });

  // ------------------------------------------
  // 2. 核心功能页 (研究生专属)
  // ------------------------------------------
  slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  
  // 标题
  slide.addText('研究生专属：科研加速器', {
    x: 0.5, y: 0.5, w: '90%', fontSize: 32, bold: true, color: CAU_YELLOW, border: { pt: 0, pb: '2pt', color: CAU_YELLOW }
  });

  // 内容卡片 1
  slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.5, w: 4.5, h: 2, fill: { color: 'FEFCE8' }, line: { color: CAU_YELLOW, width: 1 } });
  slide.addText('文献综述生成', { x: 0.7, y: 1.7, fontSize: 18, bold: true, color: CAU_YELLOW });
  slide.addText('输入方向（如农业机械化），自动生成框架与核心观点，缩短阅读时间。', { x: 0.7, y: 2.2, w: 4, fontSize: 14, color: '333333' });

  // 内容卡片 2
  slide.addShape(pres.ShapeType.rect, { x: 5.2, y: 1.5, w: 4.5, h: 2, fill: { color: 'FEFCE8' }, line: { color: CAU_YELLOW, width: 1 } });
  slide.addText('领域快速扫描', { x: 5.4, y: 1.7, fontSize: 18, bold: true, color: CAU_YELLOW });
  slide.addText('快速识别领域内的经典论文与核心专利，辅助查新与创新点挖掘。', { x: 5.4, y: 2.2, w: 4, fontSize: 14, color: '333333' });

  // ------------------------------------------
  // 3. 学术产出页
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('学术产出与答辩辅助', {
    x: 0.5, y: 0.5, w: '90%', fontSize: 32, bold: true, color: '1C1917', border: { pt: 0, pb: '2pt', color: '1C1917' }
  });

  const bulletPoints = [
    { text: 'PPT 制作辅助', options: { fontSize: 24, bold: true, breakLine: true, color: CAU_GREEN } },
    { text: '一键生成开题、组会、答辩 PPT 大纲', options: { fontSize: 18, indentLevel: 1, breakLine: true } },
    { text: '', options: { breakLine: true } },
    { text: '学术生涯规划', options: { fontSize: 24, bold: true, breakLine: true, color: CAU_GREEN } },
    { text: '硕博不同阶段的发刊计划建议与时间管理', options: { fontSize: 18, indentLevel: 1, breakLine: true } }
  ];
  slide.addText(bulletPoints, { x: 1, y: 1.8, w: 8, h: 4 });

  // ------------------------------------------
  // 4. 技术架构
  // ------------------------------------------
  slide = pres.addSlide();
  slide.addText('技术栈与实现', {
    x: 0.5, y: 0.5, w: '90%', fontSize: 32, bold: true, color: CAU_GREEN
  });
  
  slide.addShape(pres.ShapeType.rect, { x: 1, y: 2, w: 2.5, h: 1.5, fill: { color: '22c55e' } });
  slide.addText('React 19\nFrontend', { x: 1, y: 2, w: 2.5, h: 1.5, align: 'center', color: 'FFFFFF' });

  slide.addShape(pres.ShapeType.arrow, { x: 3.6, y: 2.6, w: 1, h: 0.3, fill: { color: '9ca3af' } });

  slide.addShape(pres.ShapeType.rect, { x: 4.8, y: 2, w: 2.5, h: 1.5, fill: { color: '3b82f6' } });
  slide.addText('Coze Agent\nAI Core', { x: 4.8, y: 2, w: 2.5, h: 1.5, align: 'center', color: 'FFFFFF' });

  slide.addShape(pres.ShapeType.arrow, { x: 7.4, y: 2.6, w: 1, h: 0.3, fill: { color: '9ca3af' } });

  slide.addShape(pres.ShapeType.rect, { x: 8.6, y: 2, w: 2.5, h: 1.5, fill: { color: '000000' } });
  slide.addText('Vercel\nDeployment', { x: 8.6, y: 2, w: 2.5, h: 1.5, align: 'center', color: 'FFFFFF' });

  // ------------------------------------------
  // 保存文件
  // ------------------------------------------
  await pres.writeFile({ fileName: '麦小吉_AI助手_演示.pptx' });
};
