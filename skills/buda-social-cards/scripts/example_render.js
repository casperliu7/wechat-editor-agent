const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function getBase64Image(filePath) {
  const ext = path.extname(filePath).slice(1);
  const data = fs.readFileSync(path.resolve(__dirname, filePath));
  return 'data:image/' + (ext === 'jpg' ? 'jpeg' : ext) + ';base64,' + data.toString('base64');
}

const cards = [
  {
    id: 1,
    title: "打破代码壁垒<br>10岁小孩主导",
    body: "别卷代码了，AI 时代，<br>决定你能走多远的不是代码，<br>而是你的想象力。",
    type: "image",
    image: getBase64Image("path_b_bg_1_cover.png")
  },
  {
    id: 2,
    title: "手搓音游<br>13岁的创造者",
    body: "13岁的 Eason，不懂复杂算法，<br>却能用 AI 助手构建下落式音乐节奏游戏。",
    type: "image",
    image: getBase64Image("uploads/eason 演示游戏.jpg")
  },
  {
    id: 3,
    title: "零基础制作人<br>防刷与经济系统",
    body: "10岁的 Yanni，像个真正的产品经理。<br>她在 AI 的配合下设计逻辑与虚拟经济系统。",
    type: "image",
    image: getBase64Image("uploads/yanni 演示游戏.jpg")
  },
  {
    id: 4,
    title: "新时代分工<br>人脑 vs 机器",
    body: "你是制定规则的“大脑”，<br>AI 则是执行任务的“双手”。<br>把枯燥的实现交给机器，把创造留给自己。",
    type: "infographic",
    html: `
      <div class="infographic-box">
        <div class="compare-container">
          <div class="compare-card human">
            <div class="compare-icon">🧠</div>
            <h3>创造者 (你)</h3>
            <ul>
              <li>制定规则与玩法</li>
              <li>设计底层经济系统</li>
              <li>发挥想象力的边界</li>
              <li>把控最终产品体验</li>
            </ul>
          </div>
          <div class="vs-badge">VS</div>
          <div class="compare-card ai">
            <div class="compare-icon">🦞</div>
            <h3>执行者 (AI)</h3>
            <ul>
              <li>编写底层代码逻辑</li>
              <li>生成游戏美术资产</li>
              <li>排查修复运行 Bug</li>
              <li>承担所有枯燥劳动</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 5,
    title: "创造者时代<br>3步开启旅程",
    body: "不再被代码束缚。<br>访问 buda.im，领养你的第一只 AI 龙虾。<br>释放想象力，现在就出发！",
    type: "infographic",
    html: `
      <div class="infographic-box">
        <div class="timeline">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-content">
              <h4>构思点子</h4>
              <p>无需理会代码，把脑海里的创意、游戏或工具用文字记录下来。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-content">
              <h4>分配任务</h4>
              <p>在 Buda 唤醒 AI，像产品经理一样给 AI 提需求，让它写代码。</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-content">
              <h4>验收与发布</h4>
              <p>验收 AI 的成果，一键部署发布。成为 10岁/13岁 一样的独立制作人！</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
];

const renderHtml = (card) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Serif+SC:wght@700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1080px;
      height: 1440px;
      background-color: oklch(0.985 0.006 85);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 80px 80px 60px 80px;
      font-family: 'Inter', sans-serif;
      color: #333;
    }
    .header { margin-bottom: 60px; }
    .title { font-family: 'Noto Serif SC', serif; font-size: 85px; line-height: 1.2; color: oklch(0.52 0.076 78); margin: 0; font-weight: 700; }
    .image-wrapper { flex: 1; width: 100%; border-radius: 40px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.12); margin-bottom: 60px; display: flex; justify-content: center; align-items: center; background: #fff; }
    .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
    .footer { font-size: 38px; line-height: 1.6; color: #444; border-left: 10px solid oklch(0.52 0.076 78); padding-left: 40px; }
    .brand { position: absolute; top: 80px; right: 80px; font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.3); letter-spacing: 2px; text-transform: uppercase; }

    /* Infographic Styles */
    .infographic-box { width: 100%; height: 100%; padding: 50px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
    
    /* Card 4 Compare */
    .compare-container { display: flex; width: 100%; gap: 30px; align-items: center; }
    .compare-card { flex: 1; background: oklch(0.985 0.006 85); border: 3px solid oklch(0.52 0.076 78); border-radius: 30px; padding: 40px; height: 500px; display: flex; flex-direction: column; box-sizing: border-box; }
    .compare-card.ai { background: oklch(0.52 0.076 78); color: #fff; }
    .compare-card.ai h3 { color: #fff; }
    .compare-icon { font-size: 80px; margin-bottom: 10px; }
    .compare-card h3 { font-size: 42px; font-family: 'Noto Serif SC', serif; margin: 0 0 30px 0; color: oklch(0.52 0.076 78); }
    .compare-card ul { list-style: none; padding: 0; margin: 0; font-size: 28px; line-height: 2; }
    .compare-card li::before { content: '✓'; margin-right: 15px; font-weight: bold; }
    .vs-badge { font-size: 40px; font-weight: 900; color: oklch(0.52 0.076 78); font-family: 'Inter', sans-serif; }

    /* Card 5 Timeline */
    .timeline { display: flex; flex-direction: column; gap: 50px; width: 100%; padding: 0 20px; }
    .step { display: flex; align-items: flex-start; gap: 40px; }
    .step-num { font-size: 80px; font-weight: 800; color: oklch(0.52 0.076 78); font-family: 'Inter', sans-serif; line-height: 0.9; opacity: 0.5; }
    .step-content h4 { font-size: 44px; font-family: 'Noto Serif SC', serif; margin: 0 0 15px 0; color: #111; }
    .step-content p { font-size: 32px; color: #555; margin: 0; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="brand">BUDA.IM</div>
  <div class="header">
    <h1 class="title">${card.title}</h1>
  </div>
  <div class="image-wrapper">
    ${card.type === 'infographic' ? card.html : '<img src="' + card.image + '" />'}
  </div>
  <div class="footer">
    ${card.body}
  </div>
</body>
</html>
`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const card of cards) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 2 });
    const html = renderHtml(card);
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const rawPath = 'path_b_card_raw_' + card.id + '.png';
    await page.screenshot({ path: rawPath });
    console.log('Generated raw snapshot: ' + rawPath);
    await page.close();
  }
  await browser.close();
})();
